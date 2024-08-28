// require your server and launch it
const server = require('./api/server.js');

server.listen(9000, () => {
  console.log('server started on http://localhost:9000');   
})