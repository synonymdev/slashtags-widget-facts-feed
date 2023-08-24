const { Reader } = require('@synonymdev/feeds')

class BitcoinFactsReader extends Reader {
  /**
   * Read all facts from the facts document.
   *
   * @returns {Promise<string[] | null>}
   */
  getAllFacts () {
    return this.getField('facts')
  }

  /**
   * Read the latest price of trading pair.
   *
   * @returns {Promise<string>}
   */
  async getRandomFact () {
    const facts = await this.getAllFacts()
    const randomIndex = Math.floor(Math.random() * facts.length)
    return facts[randomIndex]
  }
}

module.exports = BitcoinFactsReader
