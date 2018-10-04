const extension = require('extensionizer');

extension.webRequest.onBeforeRequest.addListener(details => {
  // details.url will look like「http://<your BNS>/」
  const name = details.url.substring(7, details.url.length - 1);
  if (/^.+\.(eth|wan|etc|bch)$/.test(name) === false) {
    return;
  }
  extension.tabs.query({ currentWindow: true, active: true }, tab => {
    extension.tabs.update(tab[0].id, { url: `loading.html?tabid=${tab[0].id}&name=${name}` });
  });

  return { cancel: true };
}, {
    urls: [
      "*://*.eth/",
      '*://*.eth/*',
      "*://*.etc/",
      '*://*.etc/*',
      "*://*.wan/",
      '*://*.wan/*',
      "*://*.bch/",
      '*://*.bch/*'
    ],
  });