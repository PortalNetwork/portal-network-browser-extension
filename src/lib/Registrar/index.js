import Web3 from "web3";
import namehash from "eth-ens-namehash";
import multihash from "multihashes";
import registrar from "../abi/registrar.js";
import resolver from "../abi/resolver.js";
const abi = { registrar, resolver };
const ENS_HttpProvider = "https://mainnet.infura.io/";
const ECNS_HttpProvider = "https://etc-parity.0xinfra.com";
const WNS_HttpProvider = "http://wanchain.portal.network";
const REGISTRAR_ENS_MAIN_NET = "0x314159265dd8dbb310642f98f50c066173c1259b";
const REGISTRAR_ECNS_MAIN_NET = "0xb96836a066ef81ea038280c733f833f69c23efde";
const REGISTRAR_WNS_MAIN_NET = "0xee8d418fd33e69782015ea4313dfd8eb7b1b91ce";
export const BNS = (name, tldidx)=> {
  const ProviderArr = [
    ENS_HttpProvider,
    ECNS_HttpProvider, 
    WNS_HttpProvider
  ];
  const RegistrarArr = [
    REGISTRAR_ENS_MAIN_NET,
    REGISTRAR_ECNS_MAIN_NET,
    REGISTRAR_WNS_MAIN_NET
  ];
  const web3 = new Web3(new Web3.providers.HttpProvider(ProviderArr[tldidx]));
  const hash = namehash.hash(name);
  const Registrar = new web3.eth.Contract(abi.registrar, RegistrarArr[tldidx]);
  return new Promise((resolve, reject) => {
    Registrar.methods.resolver(hash).call()
    .then(address => {
      if (address === '0x0000000000000000000000000000000000000000') {
        reject(null)
      } else {
        const Resolver = new web3.eth.Contract(abi.resolver, address)
        console.log('Resolver:',Resolver);
        return Resolver.methods.content(hash).call()
      }
    })
    .then(contentHash => {
      if (contentHash === '0x0000000000000000000000000000000000000000000000000000000000000000') reject(null)
      if (contentHash) {
        const hex = contentHash.substring(2)
        const buf = multihash.fromHexString(hex)
        resolve(multihash.toB58String(multihash.encode(buf, 'sha2-256')))
      } else {
        reject(null)
      }
    })
  })
}
