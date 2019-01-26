import { app } from './app';
import { syncDB } from './util/syncDB';
import { setupLog } from './util/logger';

app.listen(app.get('PORT'), () => {
  console.log(`Listening on PORT: ${app.get('PORT')}. In Environment: ${process.env.NODE_ENV}`);
  setupLog()
    .then(() => {
      syncDB();
    })
    .catch((err) => {
      console.log(err);
    });
});
