import { BNS } from "./Registrar";
const BCNS_API_URL = 'http://bcns-rest.herokuapp.com/v1/dataRetrieval/BCNS/resolution/multihash';
const TLD_LIST = ['eth', 'etc', 'wan'];


export default (name) => {
  const extractDomain = name.split(".");
  const tld = extractDomain.pop();
  const label = extractDomain.shift();

  switch (tld) {
    case 'eth':
    case 'etc':
    case 'wan':
      const providerIndex = TLD_LIST.indexOf(tld);
      return BNS(name, providerIndex);
      break;
    case 'bch':
      const result = fetch(`${BCNS_API_URL}?domain=${label}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          return new Promise((resolve, reject) => reject(null));
        })
        .catch(error => new Promise((resolve, reject) => reject(null)))
        .then(result => new Promise((resolve, reject) => resolve(result.multihash)));
      return result;
      break;
    default:
      return new Promise((resolve, reject) => reject(null));
      break;
  }
}