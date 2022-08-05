// modules scafolding

const handaler = {};

handaler.notFoundHandaler = (requestPropaties, callback) => {
    callback(404, {
        message: 'Not Found',
    });
};

module.exports = handaler;
