export const log = (...args: string[] | any[]) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(...args);
  }
};
