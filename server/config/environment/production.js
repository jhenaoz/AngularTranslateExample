'use strict';

// Production specific configuration
// =================================
module.exports = {
    ip: process.env.IP || undefined,

    port: process.env.PORT || 8080, //THIS IS THE PORT WHEN THE WEBAPP SHOULD BE RUNNING
    https:true, //THIS SPECIFY IS HTTPS CALL WILL BE USED FOR CALL THE CMS
    api : {
        'host': 'https://practice.checkedup.com',
        'port': 443, //THIS IS THE PORT WHEN THE CMS IS RUNNING
        'apiKey':'1549ae7a6160dde20a91a5868b764373' //THE API KEY FOR ACCESS THE CMS API
    }

};
