import { app } from './app';
import { syncDB } from './util/syncDB';

app.listen(app.get('PORT'), () => {
  console.log(`Listening on PORT: ${app.get('PORT')}. In Environment: ${process.env.NODE_ENV}`);
  syncDB();
});
