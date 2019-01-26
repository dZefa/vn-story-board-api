import { sequelize } from '../database';
import { User } from '../database/models/user';
import { dbLog } from '../util/logger';

export const syncDB = () => {
  const force = process.env.NODE_ENV === 'dev';

  return sequelize.authenticate()
    .then(() => {
      console.log(`Database has been authenticated.`);

      User.sync({ force })
        .then(() => {
          console.log(`User model synced.`);
        })
        .catch((err) => {
          dbLog(`Error syncing User model. Error: ${err}`);
          console.log(`Error sycning User model.`);
        })
    })
    .catch((err) => {
      dbLog(`Error authenticating database. Error: ${err}`);
      console.log(`Error authenticating database`);
    });
};
