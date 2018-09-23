# Portal Network Browser Extension

## Environment Setup
```
npm install
```
## Test cases

- Type-in Domain
    - [ ] `phyrextsai.eth || phyrextsai.etc || phyrextsai.wan` : able to jump to IPFS page
    - [ ] `phyrextsai.ethxxx` : unable to enter extension to be able to search the loading page because the wrong ltd
    - [ ] `abcdefghijk.eth` : enter non-existing domain and jump to page not found
    - [ ] multihash : search if the domain resolver has a multihash, use multimash if there's one
- enter loading page
    - [ ] when it takes too long to load : jump to page 40
    - [ ] unable to find ipfs page : jump to page not found
    - [ ] switch to pagination while loading in progress : the original loading page will jump to the specific ipfs page instead of switch to the pagination
- click link
    - [ ] Join Us On Telegram : jump to telegram app
    - [ ] twitter icon : jump to twitter website
    - [ ] medium icon : jump to medium website
    - [ ] main icon : open mail window
    - [ ] Powered by Portal Network : open official website
