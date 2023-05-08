const fs = require('fs');
const path = require('path');

const { stdin, stdout, exit } = process;
const exitWord = 'exit';

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) throw err;
});
stdout.write('Input text!\r\n');
stdin.on('data', (data) => {
  const dataString = data.toString().trim();
  if (dataString === exitWord) {
    stdout.write('Bye-bye!');
    exit();
  }
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    `${data}`,
    (err) => { if (err) throw err; },
  );
});

process.on('SIGINT', () => {
  stdout.write('Bye-bye!');
  exit();
});
