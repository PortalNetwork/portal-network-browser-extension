const resolver = require('./resolver.js');
const extension = require('extensionizer');
const parse = require('url-parse');

const portalNetwork = 'ipfs.portal.network/ipfs/'
const infura = 'ipfs.infura.io/ipfs/'

extension.webRequest.onBeforeRequest.addListener(details => {
  const URL = parse(details.url, true);
  let clearTime = null
  let name = URL.hostname;
  let gateway = '';
  // protocol
  if (URL.protocol === 'https:') {
    gateway = URL.protocol + '//' + infura;
  } else if (URL.protocol === 'http:') {
    gateway = URL.protocol + '//' + portalNetwork;
  } else {
    return extension.tabs.update(tab.id, { url: '404.html' })
  }
  extension.tabs.query({currentWindow: true, active: true}, tab => {
    extension.tabs.update(tab.id, { url: "loading.html" })

    clearTime = setTimeout(() => {
      return extension.tabs.update(tab.id, { url: '404.html' })
    }, 60000)
    
    resolver.resolve(name).then(ipfsHash => {
      clearTimeout(clearTime)
      let url = gateway + ipfsHash + URL.pathname
      return fetch(url, {method: "HEAD"})
      .then(response => response.status)
      .then(statusCode => {
        if (statusCode !== 200) return "Local"
        extension.tabs.update(tab.id, {url: url})
      })
      .catch(err => {
        let url = gateway + ipfsHash + URL.pathname
        extension.tabs.update(tab.id, {url: url})
        return err
      })
    })
    .catch(err => {
      clearTimeout(clearTime)
      extension.tabs.update(tab.id, {url: "error.html?name=" + name})
    })
  })
  return {cancel: true}
}, {urls: ["*://*.eth/", '*://*.eth/*', "*://*.etc/", '*://*.etc/*', "*://*.wan/", '*://*.wan/*']})
