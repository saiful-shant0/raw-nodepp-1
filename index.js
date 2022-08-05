const http = require('http');
const { handleReqRes } = require('./Helpers/handleReqRes');

const app = {};
app.config = {
    port: 5000,
};

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Port Number  ${app.config.port}`);
    });
};

app.handleReqRes = handleReqRes;
app.createServer();
