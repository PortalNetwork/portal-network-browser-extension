const Web3 = require('web3')
const namehash = require('eth-ens-namehash')
const multihash = require('multihashes')
const REGISTRAR_ENS_MAIN_NET = "0x314159265dd8dbb310642f98f50c066173c1259b"
const REGISTRAR_ECNS_MAIN_NET = "0xcb177520ACa646881D53909b456A9B2B730391f0"
const REGISTRAR_WNS_MAIN_NET = "0x48859467c329854af6ecc363c8ddb393b911586b"
const abi = {
  registrar: JSON.parse(require('../lib/registrar.js')),
  resolver: JSON.parse(require('../lib/resolver.js'))
}
function ens(name) {
  let web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"))
  let hash = namehash.hash(name)
  Registrar = new web3.eth.Contract(abi.registrar, REGISTRAR_ENS_MAIN_NET)
  return new Promise((resolve, reject) => {
    Registrar.methods.resolver(hash).call()
    .then(address => {
      if (address === '0x0000000000000000000000000000000000000000') {
        reject(null)
      } else {
        Resolver = new web3.eth.Contract(abi.resolver, address)
        return Resolver.methods.content(hash).call()
      }
    })
    .then(contentHash => {
      if (contentHash === '0x0000000000000000000000000000000000000000000000000000000000000000') reject(null)
      if (contentHash) {
        hex = contentHash.substring(2)
        buf = multihash.fromHexString(hex)
        resolve(multihash.toB58String(multihash.encode(buf, 'sha2-256')))
      } else {
        reject(null)
      }
    })
  })
}

function ecns(name) {
  let web3 = new Web3(new Web3.providers.HttpProvider("https://etc-geth.0xinfra.com"))
  let hash = namehash.hash(name)
  Registrar = new web3.eth.Contract(abi.registrar, REGISTRAR_ECNS_MAIN_NET)
  return new Promise((resolve, reject) => {
    Resolver = new web3.eth.Contract(abi.resolver, '0x4fa1fc37a083abe4c53b6304f389042bc0566855')
    Resolver.methods.content(hash).call()
    .then(contentHash => {
      if (contentHash === '0x0000000000000000000000000000000000000000000000000000000000000000') reject(null)
      if (contentHash) {
        hex = contentHash.substring(2)
        buf = multihash.fromHexString(hex)
        resolve(multihash.toB58String(multihash.encode(buf, 'sha2-256')))
      } else {
        reject(null)
      }
    })
  })
}

function wns(name) {
  let web3 = new Web3(new Web3.providers.HttpProvider("http://wanchain.portal.network"))
  let hash = namehash.hash(name)
  Registrar = new web3.eth.Contract(abi.registrar, REGISTRAR_WAN_MAIN_NET)
  return new Promise((resolve, reject) => {
    Resolver = new web3.eth.Contract(abi.resolver, '')
    Resolver.methods.content(hash).call()
    .then(contentHash => {
      if (contentHash === '0x0000000000000000000000000000000000000000000000000000000000000000') reject(null)
      if (contentHash) {
        hex = contentHash.substring(2)
        buf = multihash.fromHexString(hex)
        resolve(multihash.toB58String(multihash.encode(buf, 'sha2-256')))
      } else {
        reject(null)
      }
    })
  })
}

module.exports.resolve = function(name) {
  let path = name.split(".");
  let tld = path[path.length - 1];
  if (tld === 'eth') {
    return ens(name);
  } else if (tld === 'etc') {
    return ecns(name);
  } else if (tld === 'wan') {
    return wns(name);
  } else {
    return new Promise((resolve, reject) => {
      reject(null)
    })
  }
}