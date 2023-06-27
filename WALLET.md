# Wallet Standard for Wallets

This guide is for wallets that want to implement the Wallet Standard. This can be done in essentially two ways:

-   A. Write a wallet with a Wallet Standard compatible API.
-   B. Wrap your existing API with a Wallet Standard compatible API.

Because Bitcoin web3 wallets are relatively new to the scene, this is a great opportunity to write a standard entirely within the umbrella of Wallet Standard. Take a look at the [reference implementation for a new wallet](./packages/wallets/satoshi), **Satoshi**.

If your wallet already has its own API, you can instead wrap it with Wallet Standard. Take a look at the [reference implementation for a wallet with an existing API](./packages/wallets/sats-connect), **Sats Connect**. Sats Connect wraps the [Bitcoin Provider API](https://github.com/secretkeylabs/sats-connect/blob/c0a02db870293c7523c8d7dcc8210a7a35a6a747/src/provider/index.ts#L9-L15) defined by [Xverse's Sats Connect](https://docs.xverse.app/sats-connect).

In both cases, your wallet will benefit from better discoverability and namespace collision avoidance.
