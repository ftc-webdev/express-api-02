import app from './app.js';

// Start the server
const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.info('Express server started on port: ' + port);
});
