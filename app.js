import * as http from 'http';
import latex2pdf from 'node-latex';

http.createServer(function (req, res) {

    // Check method
    if (req.method !== 'POST') {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end('POST only!');
        return;
    }

    // Get LaTeX
    let latex = '';
    req.on('data', (chunk) => {
        latex += chunk;
    });
    req.on('end', () => {

        // Check body
        if (!latex) {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.end('Missing LaTeX');
            return
        }

        try {
            res.setHeader('Content-Type', 'application/pdf');
            const pdf = latex2pdf(latex, {passes: 2});
            pdf.pipe(res);
            pdf.on('error', err => {
                res.writeHead(400, { "Content-Type": "text/html" });
                res.end(err.message);
            });
        } catch (e) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end(e.message);
        }
    });
}).listen(80);
