import EventEmitter from 'eventemitter3';

import type { RPC } from '../messages';

export class ExodusProvider extends EventEmitter {
    #rpc: RPC;

    constructor(rpc: RPC) {
        super();

        this.#rpc = rpc;
    }

    /** TODO: Implement. */
}
