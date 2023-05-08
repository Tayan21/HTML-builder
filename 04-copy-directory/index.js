const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

fsPromises
  .mkdir(path.join(__dirname, 'files-copy'), { recursive: true })
  .then(function () {
    console.log('Directory created successfully');
  })
  .catch(function () {
    console.log('failed to create directory');
  });

fs.readdir(
  path.join(__dirname, 'files'),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'files', file.name),
          path.join(__dirname, 'files-copy', file.name),
          (err) => {
            if (err) {
              console.log('Error Found:', err);
            } else {
              console.log('file copied');
            }
          }
        );
      });
    }
  }
);
