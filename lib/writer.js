const { Feed } = require('@synonymdev/feeds')

class FactsFeed extends Feed {
  /**
   * @param {ConstructorParameters<typeof Feed>[0]} client
   * @param {ConstructorParameters<typeof Feed>[1]} config
   * @param {ConstructorParameters<typeof Feed>[2]} opts
   */
  constructor (client, config, opts) {
    super(client, config, opts)

    this._config = config
  }

  /**
   * @param {string[]} facts
   */
  async writeFacts (facts) {
    return this.put('facts', Feed.encode(facts))
  }
}

module.exports = FactsFeed

/**
 * @typedef {{base: string, quote: string, ticker: string}} Ticker
 */
