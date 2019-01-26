import dotenv from 'dotenv';
import path from 'path';

export const loadEnv = (): void => {
  const isProd = process.env.NODE_ENV === 'production';
  let pathToEnv: string;

  if (isProd) {
    pathToEnv = path.resolve(__dirname, '../../env/prod.env');
  } else {
    pathToEnv = path.resolve(__dirname, '../../env/dev.env');
  }

  dotenv.config({ path: pathToEnv });
};
