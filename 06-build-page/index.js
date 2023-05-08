const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

(async function () {
  try {
    await fsPromises.mkdir(path.join(__dirname, 'project-dist/assets'), {
      recursive: true,
    });

    let dirs = ['fonts', 'img', 'svg'];
    dirs.forEach(async (dir) => {
      await fsPromises.mkdir(
        path.join(__dirname, `project-dist/assets/${dir}`),
        { recursive: true }
      );
    });

    fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          fs.readdir(path.join(__dirname, `assets/${file}`), (err, filesIn) => {
            if (err) console.log(err);
            else {
              filesIn.forEach((fileIn) => {
                fs.copyFile(
                  path.join(__dirname, `assets/${file}`, fileIn),
                  path.join(__dirname, `project-dist/assets/${file}`, fileIn),
                  (err) => {
                    if (err) {
                      console.log('Error Found:', err);
                    }
                  }
                );
              });
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
})();

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      let toWrite = '';
      files.forEach((file) => {
        if (!file.isDirectory() && path.extname(file.name).slice(1) == 'css') {
          fs.readFile(
            path.join(__dirname, 'styles', file.name),
            'utf-8',
            function (error, fileContent) {
              if (error) throw error;
              toWrite += fileContent + '\n';
              fs.writeFile(
                path.join(__dirname, 'project-dist', 'style.css'),
                toWrite,
                function (error) {
                  if (error) throw error;
                }
              );
            }
          );
        }
      });
    }
  }
);

fs.readFile(
  path.join(__dirname, 'template.html'),
  'utf-8',
  (err, fileContent) => {
    if (err) throw err;
    let res = fileContent;

    fs.readdir(
      path.join(__dirname, 'components'),
      { withFileTypes: true },
      (err, files) => {
        if (err) console.log(err);
        else {
          files.forEach((file) => {
            let fileName = file.name.split('.');
            fs.readFile(
              path.join(__dirname, 'components', file.name),
              'utf-8',
              (err, fileContentIn) => {
                if (err) console.log(err);
                if (
                  !file.isDirectory() &&
                  path.extname(file.name).slice(1) == 'html'
                ) {
                  res = res.replace(`{{${fileName[0]}}}`, fileContentIn);
                }
                fs.writeFile(
                  path.join(__dirname, 'project-dist', 'index.html'),
                  res,
                  function (error) {
                    if (error) throw error;
                  }
                );
              }
            );
          });
        }
      }
    );
  }
);
