const { stdin, stdout } = process;
const fs = require('fs');
const path = require("path");

stdin.resume();
process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));

const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
stdout.write('Hello! Write any text?\n')
stdin.on('data', data => {
  const name = data.toString().trim();
  if (name === 'exit') {
    process.exit();
  }

  output.write(data);
});







process.on('SIGINT', () => {
  process.exit()
});