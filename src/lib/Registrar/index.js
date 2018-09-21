import Web3 from "web3";
import multihash from "multihashes";
import Promises from 'bluebird';
import namehash from "eth-ens-namehash";
import registry from "../abi/registry.js";
import resolver from "../abi/resolver.js";
const abi = { registry, resolver };
const ENS_HttpProvider = "https://mainnet.infura.io/";
const ECNS_HttpProvider = "https://etc-parity.0xinfra.com";
const WNS_HttpProvider = "http://wanchain.portal.network";
const REGISTRY_ENS_MAIN_NET = "0x314159265dd8dbb310642f98f50c066173c1259b";
const REGISTRY_ECNS_MAIN_NET = "0xb96836a066ef81ea038280c733f833f69c23efde";
const REGISTRY_WNS_MAIN_NET = "0xee8d418fd33e69782015ea4313dfd8eb7b1b91ce";
export const BNS = (name, tldidx)=> {

  const ProviderArr = [
    ENS_HttpProvider,
    ECNS_HttpProvider, 
    WNS_HttpProvider
  ];
  const RegistrarArr = [
    REGISTRY_ENS_MAIN_NET,
    REGISTRY_ECNS_MAIN_NET,
    REGISTRY_WNS_MAIN_NET
  ];
  const web3 = new Web3(new Web3.providers.HttpProvider(ProviderArr[tldidx]));
  const hash = namehash.hash(name);
  const Registry = new web3.eth.Contract(abi.registry, RegistrarArr[tldidx]);
  let isMultihash = false;
  return new Promise((resolve, reject) => {
    Registry.methods.resolver(hash).call()
    .then(async address => {
      if (address === '0x0000000000000000000000000000000000000000') return reject(null);
      const Resolver = new web3.eth.Contract(abi.resolver, address);
      isMultihash = await Resolver.methods.supportsInterface('0xe89401a1').call();
      if(isMultihash){
        const mHash = await Resolver.methods.multihash(hash).call();
        if (mHash === '0x') return Promises.resolve(mHash);
        return Promises.resolve(mHash);
      }else{
        return Resolver.methods.content(hash).call();
      }
    })
    .then(contentHash => {
      if (contentHash === '0x0000000000000000000000000000000000000000000000000000000000000000') reject(null);
      if (contentHash) {
        const hex = contentHash.substring(2);
        const buf = multihash.fromHexString(hex);
        const toB58String = multihash.toB58String(buf);
        const toEncode = multihash.toB58String(multihash.encode(buf, 'sha2-256'));
        resolve(isMultihash ? toB58String : toEncode);
      } else {
        reject(null)
      }
    })
  })
}
