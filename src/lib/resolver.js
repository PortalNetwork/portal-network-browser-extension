import { BNS } from "./Registrar";
const tldArr = ['eth', 'etc', 'wan'];

function InquireIpfs(tld, name) {
  let idx = tldArr.indexOf(tld);
  if(idx === -1) return new Promise((resolve, reject) => reject(null));
  return BNS(name, idx);
}

export default (name)=> {
  const path = name.split(".");
  const tld = path[path.length - 1];
  return InquireIpfs(tld, name);
}