const test = require('brittle')
const os = require('os')
const fs = require('fs')
const path = require('path')
const { Client, Relay } = require('@synonymdev/web-relay')

const { Reader, Feed } = require('../index.js')

const icon = fs.readFileSync(path.join(__dirname, '../lib/icon.svg'))
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/slashfeed.json'), 'utf8'))

const FACTS = [
  'fact 1',
  'fact 2',
  'fact 3'
]

test('immediate update', async (t) => {
  const relay = new Relay(tmpdir())
  const address = await relay.listen()

  const client = new Client({ storage: tmpdir(), relay: address })
  const feed = new Feed(client, config, { icon })

  await feed.ready()
  await feed.writeFacts(FACTS)

  const readerClient = new Client({ storage: tmpdir() })
  const reader = new Reader(readerClient, feed.url)

  t.alike(await reader.getConfig(), config)
  t.alike(await reader.getIcon(), icon)

  const facts = await reader.getAllFacts()

  t.alike(facts, FACTS)

  const randomFact = await reader.getRandomFact()
  t.ok(FACTS.includes(randomFact))

  relay.close()
  await feed.close()
})

function tmpdir () {
  return path.join(os.tmpdir(), Math.random().toString(16).slice(2))
}
