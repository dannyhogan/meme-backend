const app = require('./lib/app');
require('./lib/utils/connect')();

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
