# slashtags-widget-facts-feed

A slashtags widget with interesting facts about Bitcoin. 

## Usage

### Feed

Copy `config/config.example.json` to `config/config.json` then edit the relay address.

```bash
cp config/config.example.json config/config.json
```

In `config/config.json` you should edit the `facts` array to include all the facts you need to publish.

Start the feed writer

```bash
npm start
```

It will generate a `keyPair` and persist that in `config/config.json` for future sessions.

It should print: `Running Bitcoin facts feed: slashfeed:<id>/Bitcoin Facts?relay=<relay-address>`

### Reader

To read The facts feed use the `Reader` helper class.

```js
const { Feed, Reader } = require('slashtags-widget-facts-feed');

(async () => {
  const client = new Client({ storage: './path/to/feed/storage', relay: 'https://web-relay.example.com' })
  const feed = new Feed(client, config, { icon })

  await feed.ready() 
  await feed.writeFacts(['fact 1', 'fact 2', 'fact 3'])

  const client = new Client({ storage: './path/to/reader/storage'})

  const readerClient = new Client({ storage: tmpdir() })
  const reader = new Reader(readerClient, feed.url)

  const facts = await reader.getAllFacts()
  const random = await reader.getRandomFacts()
})
```

