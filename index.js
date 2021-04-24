const http = require('http');
const url = require('url');

let data = [{"astro_r": "101",
    "astro_l": "111",
    "message": "have a wonderfull day"},
    {"astro_r": "102",
        "astro_l": "111",
        "message": "its a joy fully day"}];

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {

    const reqUrl =  url.parse(req.url, true);

    if(reqUrl.pathname === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        return res.end("WelCome to the World of your future");
    }

    if(reqUrl.pathname === '/astro' && req.method === 'POST') {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {

            body = JSON.parse(body);

            data.push(body);

            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            return res.end(JSON.stringify(body));
        });
    }

    if(reqUrl.pathname === '/astros' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        return res.end(JSON.stringify(data));
    }

    if (reqUrl.pathname.split('/')[1] === 'astro' && req.method === 'GET') {

        const astro_r = reqUrl.query.astro_r;
        const astro_l = reqUrl.query.astro_l;
        const astro = data.filter(astro => astro.astro_r === astro_r && astro.astro_l === astro_l);

        const my_message = astro[0].message;
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        return res.end(my_message);

    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});