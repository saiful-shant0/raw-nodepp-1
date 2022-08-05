const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandaler } = require('../handalers/routesHandaler/notFoundHandaler');

const handler = {};
handler.handleReqRes = (req, res) => {
    // request handeling
    // get the url and parse
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;

    const treamedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const quaryStringObject = parseUrl.query;
    const headersObject = req.headers;

    const requestPropaties = -{
        parseUrl,
        path,
        treamedPath,
        method,
        quaryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    const ChosenHandaler = routes[treamedPath] ? routes[treamedPath] : notFoundHandaler;

    ChosenHandaler(requestPropaties, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : [];
        const payloadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadString);
    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hellow World');
    });
};
module.exports = handler;
