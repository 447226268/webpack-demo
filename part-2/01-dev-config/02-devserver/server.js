const http = require('http');

const app = http.createServer((req, res) => {
    if (req.url.includes('/hello')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello from the API!' }));
    }
})

app.listen(9000, 'localhost', () => {
    console.log('Server is running on http://localhost:9000');
});