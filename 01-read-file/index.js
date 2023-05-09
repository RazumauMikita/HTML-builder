const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readStream = new fs.ReadStream(
  path.join(__dirname, '/text.txt'),
  'utf8',
 );

 readStream.on('data', (data) => {
  stdout.write(data);
 })

