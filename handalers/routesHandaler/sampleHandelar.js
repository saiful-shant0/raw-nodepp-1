// modules scafolding

const handaler = {};

handaler.sampleHandler = (requestPropaties, callback) => {
    console.log(requestPropaties);
    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handaler;
