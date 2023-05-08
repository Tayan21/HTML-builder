const path = require('path');
const fs = require('fs');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (!file.isDirectory()) {
          let fileName = file.name.split('.');
          fs.stat(
            path.join(__dirname, 'secret-folder', file.name),
            (error, stats) => {
              if (error) {
                console.log(error);
              }
              console.log(
                `${fileName[0]} - ${path.extname(file.name).slice(1)} - ${
                  stats.size
                } bytes`
              );
            }
          );
        }
      });
    }
  }
);
