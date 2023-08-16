export = FactsFeed;
declare class FactsFeed extends Feed {
    /**
     * @param {ConstructorParameters<typeof Feed>[0]} client
     * @param {ConstructorParameters<typeof Feed>[1]} config
     * @param {ConstructorParameters<typeof Feed>[2]} opts
     */
    constructor(client: [client: import("@synonymdev/web-relay/types/lib/client"), config: Feed.Config, opts?: {
        icon?: Uint8Array;
    }][0], config: [client: import("@synonymdev/web-relay/types/lib/client"), config: Feed.Config, opts?: {
        icon?: Uint8Array;
    }][1], opts: [client: import("@synonymdev/web-relay/types/lib/client"), config: Feed.Config, opts?: {
        icon?: Uint8Array;
    }][2]);
    _config: Feed.Config;
    /**
     * @param {string[]} facts
     */
    writeFacts(facts: string[]): Promise<void>;
}
declare namespace FactsFeed {
    export { Ticker };
}
import { Feed } from "@synonymdev/feeds";
type Ticker = {
    base: string;
    quote: string;
    ticker: string;
};
//# sourceMappingURL=writer.d.ts.map