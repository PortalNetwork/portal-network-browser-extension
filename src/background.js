// const resolver = require('./lib/resolver.js');
const extension = require('extensionizer');
// const parse = require('url-parse');
// const portalNetwork = 'ipfs.portal.network/ipfs/';
// const infura = 'https://ipfs.infura.io/ipfs/';
extension.webRequest.onBeforeRequest.addListener(details => {
    // const URL = parse(details.url, true);
    // let name = URL.hostname;
    // let gateway = '';
    // if (URL.protocol === 'https:') {
    //     gateway = URL.protocol + '//' + infura;
    //     console.log('gateway:', gateway);
    // } else if (URL.protocol === 'http:') {
    //     gateway = URL.protocol + '//' + portalNetwork;
    //     console.log('gateway:', gateway);
    // } else {
    //     return extension.tabs.update(tab.id, { url: '404.html' })
    // }
    const name = details.url.substring(7, details.url.length - 1);
    if (/^.+\.(eth|wan|etc)$/.test(name) === false) return;
    extension.tabs.query({ currentWindow: true, active: true }, tab => {
        extension.tabs.update(tab[0].id, { url: `loading.html?tabid=${tab[0].id}&name=${name}` });
        // resolver.default(name).then(ipfsHash => {
        //     let url = `https://ipfs.infura.io/ipfs/${ipfsHash}`;
        //     return fetch(url, { method: "HEAD" })
        //         .then(response => response.status)
        //         .then(statusCode => {
        //             if (statusCode !== 200) return "Local"
        //             extension.tabs.update(tab.id, { url: url })
        //         })
        //         .catch(err => {
        //             let url = `https://ipfs.infura.io/ipfs/${ipfsHash}`
        //             extension.tabs.update(tab.id, { url: url })
        //             return err
        //         })
        // })
        // .catch(err => {
        //     extension.tabs.update(tab.id, { url: "error.html?name=" + name })
        // })
    })
    return { cancel: true }
}, { urls: ["*://*.eth/", '*://*.eth/*', "*://*.etc/", '*://*.etc/*', "*://*.wan/", '*://*.wan/*'] })