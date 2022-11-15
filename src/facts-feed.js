import fs from 'fs'
import path from 'path'
import Feeds from '@synonymdev/feeds'
import { format, encode } from '@synonymdev/slashtags-url'
import logger from './logger.js'


export default class FactsFeed {
    constructor(config, schema) {
        this.config = config
        this.schema = schema
        this.feedStorage = null
        this.driveId = config.driveId
    }

    async init() {
        if (this.feedStorage) {
            throw new Error('Init called twice')
        }

        // Set up the storage for the feeds
        this.feedStorage = new Feeds(this.config.storagePath, this.schema)

        // ensure a drive has been created for our feeds and announce it - gets the keys back
        const driveKeys = await this.feedStorage.feed(this.driveId, { announce: true })

        // Write the logo images into the feed
        const imageData = fs.readFileSync('./schemas/images/facts.svg')
        await this.feedStorage.ensureFile(this.driveId, '/images/facts.svg', imageData)

        // this is the hyperdrive that will contain all the feed data
        const url = format(driveKeys.key, { protocol: 'slashfeed:', fragment: { encryptionKey: encode(driveKeys.encryptionKey) } })
        logger.info(this.schema.name)
        logger.info(url)
    }

    async start() {
        if (!this.feedStorage) {
            throw new Error('Must call init before you can start')
        }

        // update the news and set a timer to do it again from time to time
        await this.updateFacts()
        logger.info('All Facts updated. Sharing drive...')
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    async updateFacts() {
        logger.info(`Ensuring ${this.config.facts.length} facts are in the drive...`)
        for (const fact of this.config.facts) {
            await this.ensureFact(fact)
        }
    }

    async ensureFact(fact) {
        // Generate a filename for the headline
        const regex = /[^a-z0-9]+/gi;
        const filename = fact.toLowerCase().trim().replace(regex, '-')
        const key = path.join(Feeds.FEED_PREFIX, filename)

        // Ensure that the file exists and is up to date
        const data = Buffer.from(fact)
        const updated = await this.feedStorage.ensureFile(this.driveId, key, data)
        if (updated) {
            logger.info(`  ${key} => ${fact}`)
        }
    }
}