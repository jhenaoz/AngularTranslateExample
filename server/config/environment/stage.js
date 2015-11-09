'use strict';

// Stage specific configuration
// ==================================
module.exports = {
    ip: process.env.IP || undefined,

    // Server port
    port: process.env.PORT || 9000,
    https:true,
    api : {
        'host': 'dev.checkedup.com',
        'port': 443,
        'apiKey':'1549ae7a6160dde20a91a5868b764373'
    }
};
