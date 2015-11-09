'use strict';

// Development specific configuration
// ==================================
module.exports = {
    ip: process.env.IP || undefined,

    // Server port
    port: 9000,
    https:true,
    api : {
        // 'host': '52.22.149.148',
        'host': 'dev.checkedup.com',
        'port': 443,
        'apiKey':'1549ae7a6160dde20a91a5868b764373'
    }
};
