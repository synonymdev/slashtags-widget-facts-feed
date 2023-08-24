const { Feed } = require('./index.js')
const { Client } = require('@synonymdev/web-relay')
const path = require('path')
const fs = require('fs')

const configPath = path.join(__dirname, 'config/config.json')

const { keyPair, storage, relay, facts } = readConfig()

const client = new Client({ storage, relay, keyPair })
writeConfig()

const icon = fs.readFileSync(path.join(__dirname, './lib/icon.svg'))
const config = JSON.parse(fs.readFileSync(path.join(__dirname, './lib/slashfeed.json'), 'utf8'))

const feed = new Feed(client, config, { icon })

feed.ready().then(async () => {
  await feed.writeFacts(facts)

  console.log('Updated Bitcoin facts feed:', feed.url)
})

function readConfig() {
  let config = {}
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  } catch { }

  try {
    config = {
      storage: config.storage,
      relay: config.relay,
      facts: config.facts,
      keyPair: {
        publicKey: Buffer.from(config.publicKey, 'hex'),
        secretKey: Buffer.from(config.secretKey, 'hex')
      }
    }
  } catch { }

  return config
}

function writeConfig() {
  const encoded = JSON.stringify({
    storage,
    relay,
    facts,
    publicKey: client._keyPair.publicKey.toString('hex'),
    secretKey: client._keyPair.secretKey.toString('hex')
  }, null, 2)

  fs.writeFileSync(configPath, encoded)
}
