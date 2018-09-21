# Portal Network Browser Extension

## Install

[Install Link](https://chrome.google.com/webstore/detail/portal-network/apcnffelpkinnpoapmokieojaffmcpmf)

## Simple Summary
Portal Network browser extension can use your browser to interact with IPFS content by Ethereum Name Service(ENS), Ethereum Classic Name Service(ECNS) and Wanchain Name Service(WNS) resovler smart contract.
  
## Motivation
Portal Network browser extension parse IPFS hashes and redirects your browser to content with the IPFS data provider(`ipfs.infura.io`).

## Specification
Resolve from ENS, ECNS, WNS Public Resolver `getContent` hash to IPFS hash, and redirect url to `ipfs.infura.io`.

## Development 
```
npm run watch
```

## Build for Publishing
```
npm run deploy
```

## Unit Test
```
npm run test
```