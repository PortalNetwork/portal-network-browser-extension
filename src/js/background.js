const resolver = require('./resolver.js');
<<<<<<< HEAD
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
=======
const extension = require('extensionizer');
extension.webRequest.onBeforeRequest.addListener(details => {
  let name = details.url.substring(7, details.url.length - 1)
  extension.tabs.getSelected(null, tab => {
    extension.tabs.update(tab.id, { url: "loading.html" })

    setTimeout(() => {
        return extension.tabs.update(tab.id, { url: "404.html" });
    }, 60000);
    
    resolver.resolve(name).then(ipfsHash => {
      let url = "https://gateway.ipfs.io/ipfs/" + ipfsHash
      return fetch(url, {method: "HEAD"})
      .then(response => response.status)
      .then(statusCode => {
        if (statusCode !== 200) return "Local"
        extension.tabs.update(tab.id, {url: url})
      })
      .catch(err => {
>>>>>>> 54545b32ea580b510ab1d654dd5f67225024240c
        url = "https://gateway.ipfs.io/ipfs/" + ipfsHash
        extension.tabs.update(tab.id, {url: url})
        return err
      })
    })
<<<<<<< HEAD
    .catch((err) => {
      var nameWithoutTld = name.substring(0, name.lastIndexOf('.'))
      chrome.tabs.update(tab.id, {url: "error.html?name=" + name})
=======
    .catch(err => {
      let nameWithoutTld = name.substring(0, name.lastIndexOf('.'))
      extension.tabs.update(tab.id, {url: "error.html?name=" + name})
>>>>>>> 54545b32ea580b510ab1d654dd5f67225024240c
    })
  })
  return {cancel: true}
}, {urls: ["*://*.eth/", "*://*.etc/"]})
