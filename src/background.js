const resolver = require('./lib/resolver.js');
const extension = require('extensionizer');
const parse = require('url-parse');
const portalNetwork = 'ipfs.portal.network/ipfs/'
const infura = 'ipfs.infura.io/ipfs/'
console.log('-==========-');
extension.webRequest.onBeforeRequest.addListener(details => {
    const URL = parse(details.url, true);
    console.log('URL:',URL);
    let name = URL.hostname;
    console.log('name:',name);
    let gateway = '';
    // protocol
    if (URL.protocol === 'https:') {
        gateway = URL.protocol + '//' + infura;
    } else if (URL.protocol === 'http:') {
        gateway = URL.protocol + '//' + portalNetwork;
    } else {
        return extension.tabs.update(tab.id, { url: '404.html' })
    }

    const NameUel = details.url.substring(7, details.url.length - 1)
    console.log('NameUel:',NameUel);

    extension.tabs.query({ currentWindow: true, active: true }, tab => {
        extension.tabs.update(tab.id, { url: `loading.html?tabid=${tab[0].id}` })
        resolver.resolve(name).then(ipfsHash => {
            let url = gateway + ipfsHash + URL.pathname
            return fetch(url, { method: "HEAD" })
                .then(response => response.status)
                .then(statusCode => {
                    if (statusCode !== 200) return "Local"
                    extension.tabs.update(tab.id, { url: url })
                })
                .catch(err => {
                    let url = gateway + ipfsHash + URL.pathname
                    extension.tabs.update(tab.id, { url: url })
                    return err
                })
        })
        .catch(err => {
            extension.tabs.update(tab.id, { url: "error.html?name=" + name })
        })
    })
    return { cancel: true }
}, { urls: ["*://*.eth/", '*://*.eth/*', "*://*.etc/", '*://*.etc/*', "*://*.wan/", '*://*.wan/*'] })
