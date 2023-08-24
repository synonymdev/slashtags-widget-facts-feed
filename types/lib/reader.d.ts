export = BitcoinFactsReader;
declare class BitcoinFactsReader extends Reader {
    /**
     * Read all facts from the facts document.
     *
     * @returns {Promise<string[] | null>}
     */
    getAllFacts(): Promise<string[] | null>;
    /**
     * Read the latest price of trading pair.
     *
     * @returns {Promise<string>}
     */
    getRandomFact(): Promise<string>;
}
import { Reader } from "@synonymdev/feeds";
//# sourceMappingURL=reader.d.ts.map