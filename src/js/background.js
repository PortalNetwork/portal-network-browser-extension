const resolver = require('./resolver.js');
chrome.webRequest.onBeforeRequest.addListener((details) => {
  let name = details.url.substring(7, details.url.length - 1)
  chrome.tabs.getSelected(null, (tab) => {
    chrome.tabs.update(tab.id, {url: "loading.html"})
    resolver.resolve(name).then((ipfsHash) => {
      console.log("IPFS hash for " + name + ": " + ipfsHash)
      let url = "https://gateway.ipfs.io/ipfs/" + ipfsHash
      return fetch(url, {method: "HEAD"})
      .then((response) => response.status)
      .then((statusCode) => {
        if (statusCode === 200) {
          console.log("Serving content from local IPFS gateway")
          chrome.tabs.update(tab.id, {url: url})
        }
        return "Gateway"
      })
      .catch((err) => {
        console.log("Could not find local IPFS gateway so serving content from public IPFS gateway instead")
        url = "https://gateway.ipfs.io/ipfs/" + ipfsHash
        chrome.tabs.update(tab.id, {url: url})
        return err
      })
    })
    .catch((err) => {
      var nameWithoutTld = name.substring(0, name.lastIndexOf('.'))
      chrome.tabs.update(tab.id, {url: "error.html?name=" + name})
    })
  })
  return {cancel: true}
}, {urls: ["*://*.eth/", "*://*.etc/"]})
