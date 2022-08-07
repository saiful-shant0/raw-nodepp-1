const http = require('http');
const { handleReqRes } = require('./Helpers/handleReqRes');
const environment = require('./Helpers/environments');
const data = require('./lib/data');

const app = {};
// app.config = {
//     port: 5000,
// };

// testing file seystem
// todo (temporary)
// data.creat('test', 'newFile', { name: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log(`Error was , ${err}`);
// });
// data.read('test', 'newFile', (err, result) => {
//     console.log(err, result);
// });
// data.update('test', 'newFile', { name: 'USA', language: 'English' }, (err) => {
//     console.log(`Error was , ${err}`);
// });
// data.delete('test', 'newFile', (err) => {
//     console.log(err);
// });

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        // console.log(`environment Variable is ${process.env.NODE_ENV}`)
        console.log(`Port Number  ${environment.port}`);
    });
};

app.handleReqRes = handleReqRes;
app.createServer();
