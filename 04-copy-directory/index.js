const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

(async function () {

  await fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
  const copyFiles = await fsPromises.readdir(path.join(__dirname, 'files-copy'));
  for (const file of copyFiles) {
    await fsPromises.rm(path.join(__dirname, 'files-copy', file), { force: true });
  }
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
})();