const resolver = require('./resolver.js');
const extension = require('extensionizer');
extension.webRequest.onBeforeRequest.addListener(details => {
  let name = details.url.substring(7, details.url.length - 1)
  let clearTime = null
  extension.tabs.getSelected(null, tab => {
    extension.tabs.update(tab.id, { url: "loading.html" })

    clearTime = setTimeout(() => {
      return extension.tabs.update(tab.id, { url: '404.html' })
    }, 60000)
    
    resolver.resolve(name).then(ipfsHash => {
      clearTimeout(clearTime)
      let url = "https://ipfs.infura.io/ipfs/" + ipfsHash
      return fetch(url, {method: "HEAD"})
      .then(response => response.status)
      .then(statusCode => {
        if (statusCode !== 200) return "Local"
        extension.tabs.update(tab.id, {url: url})
      })
      .catch(err => {
        url = "https://ipfs.infura.io/ipfs/" + ipfsHash
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
}, {urls: ["*://*.eth/", "*://*.etc/", "*://*.wan/"]})
