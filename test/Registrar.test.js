import { BNS } from '../src/lib/Registrar';
// sean.atportal.eth
const domainData = {
    name: "phyrextsai.eth",
    tldidx: 0,
    ipfsHash: "QmUpAghbXaytas97onhD48h1FN73JWTL5PBoBoaQkXxL9e"
}
describe('BNS Resolver', ()=>{
    const { name, tldidx, ipfsHash } = domainData;
    test("BNS registrar ipfs hash", ()=>{
        let bns = BNS(name, tldidx);
        return bns.then(ipfs => expect(ipfs).toEqual(ipfsHash));
    })
})

