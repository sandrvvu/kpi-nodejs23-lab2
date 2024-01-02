import process from 'node:process';

export function gracefulShutdown(server) {
  console.log('Oops.. It is a graceful shutdown!');
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
}

export function errorMessage(res, status, message) {
  res.writeHead(status, { 'content-type': 'text/plain' });
  res.end(message);
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
