const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5501;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  // Use pathname only (strip query string and hash), decode URL encoding (e.g. %20 -> space)
  const pathname = req.url.split('?')[0].split('#')[0];
  const requested = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.replace(/^\//, ''));
  const filePath = path.resolve(__dirname, requested);

  // Ensure we don't serve files outside project directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found: ' + requested);
        return;
      }
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Open: http://localhost:${PORT}/`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is in use. Stop the other process or use a different port.`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
