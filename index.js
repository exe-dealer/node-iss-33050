const net = require('net');
const { PassThrough, pipeline } = require('stream');

net.createServer(function (incomingSocket) {
  incomingSocket.end();
  this.close();
})
.listen({ host: '127.0.0.1', port: 0 }, function () {
  const clientSocket = net.connect({
    host: '127.0.0.1',
    port: this.address().port,
  });

  const timeout = setTimeout(_ => {
    throw Error('pipeline was not finished');
  }, 1000);

  const tx = new PassThrough();
  pipeline(tx, clientSocket, _err => {
    clearTimeout(timeout);
  });
});