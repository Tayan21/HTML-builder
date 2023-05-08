const path = require("path");
const fs = require("fs");

fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      let toWrite = '';
      files.forEach((file) => {
        if (!file.isDirectory() && path.extname(file.name).slice(1) == "css") {
          fs.readFile(
            path.join(__dirname, "styles", file.name),
            "utf-8",
            function (error, fileContent) {
              if (error) throw error;
              toWrite += fileContent + '\n';
              fs.writeFile(
                path.join(__dirname, "project-dist", "bundle.css"),
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
