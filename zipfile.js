const fs = require('fs');
const archiver = require('archiver');
const output = fs.createWriteStream('dist.zip');
const archive = archiver('zip');
archive.pipe(output);
archive.directory('dist/', false);
archive.finalize();