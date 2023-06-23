# Bitcoin Wallet Standard

This repo contains Bitcoin-specific extensions to the [Wallet Standard](https://github.com/wallet-standard/wallet-standard).

# [typescript-monorepo](https://github.com/jordansexton/typescript-monorepo)

This is a simple monorepo template with some specific design goals:

* Latest TypeScript version
* Fast, incremental dependency updates and builds
* No package bundler
* Watch mode works
* ESM and CJS work (with distinct build outputs)
* Vanilla TS and React packages work
* Create React App works* (with hot module reloading of the entire workspace)
* Parcel works (with HMR)

\* Create React App, which uses Webpack 5, can't resolve ES modules without .mjs file extensions by default, so [react-app-rewired](https://github.com/timarney/react-app-rewired) is minimally used to [configure Webpack](packages/app/create-react-app/config-overrides.js) to do this.

## Prerequisites

* Node 16+
* PNPM

If you have Node 16+, you can [activate PNPM with Corepack](https://pnpm.io/installation#using-corepack):

```shell
corepack enable
corepack prepare pnpm@`npm info pnpm --json | jq -r .version` --activate
```

Corepack requires a version to enable, so if you don't have [jq](https://stedolan.github.io/jq/) installed, you can [install it](https://formulae.brew.sh/formula/jq), or just manually get the current version of pnpm with `npm info pnpm` and use it like this:

```shell
corepack prepare pnpm@7.13.4 --activate
```

## Setup

```shell
pnpm install
```

## Build

Run this to build all your workspace packages.

```shell
pnpm build
```

This will build workspace packages that use `tsc` for compilation first, then everything else.

## Watch

Run this to build and watch workspace packages that use `tsc` for compilation.

```shell
pnpm watch
```

Other packages can build and run with their own tools (like CRA's react-scripts commands).
