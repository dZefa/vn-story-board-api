import fs from 'fs';
import path from 'path';

export const log = (...args: string[] | any[]) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(...args);
  }
};

export const setupLog = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      const pathToLog = path.resolve(__dirname, './log');
  
      fs.mkdir(pathToLog, { recursive: true }, (err) => {
        if (err) {
          console.log(`Error creating Log folder.`);
          reject(err);
        }
      });
  
      fs.writeFile(`${pathToLog}/dbLog.txt`, `Logging beginning @ ${new Date().toLocaleString()}`, (err) => {
        if (err) {
          console.log(`Error creating dbLog text file.`);
          reject(err);
        }
      });
    }

    resolve();
  });
}

export const dbLog = (...args: string[] | any[]) => {
  const pathToFile = path.resolve(__dirname, '../log/dbLog.txt');

  if (process.env.NODE_ENV === 'production') {
    fs.appendFile(pathToFile, args, (err) => {
      if (err) {
        console.log(`Error writing to dbLog file. ${err}`);
      }
    });
  }
};
