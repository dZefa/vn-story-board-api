import fs from 'fs';
import path from 'path';

export const log = (...args: string[] | any[]) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(...args);
  }
};

export const dbLog = (...args: string[] | any[]) => {
  const pathToFile = path.resolve(__dirname, '../../dist/log/dbLog.txt');

  if (process.env.NODE_ENV === 'production') {
    fs.appendFile(pathToFile, JSON.stringify([...args]), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
