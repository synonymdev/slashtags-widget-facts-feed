import fs from 'fs'
import FactsFeed from './facts-feed.js'

// config
const config = JSON.parse(fs.readFileSync('./schemas/config.json', 'utf-8'))
const schema = JSON.parse(fs.readFileSync('./schemas/slashfeed.json', 'utf-8'))

// create the new feed
const feeds = new FactsFeed(config, schema)

// get it started
await feeds.init()
await feeds.start()

