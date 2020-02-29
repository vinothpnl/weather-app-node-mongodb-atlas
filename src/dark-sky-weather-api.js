const request = require('request');

const get = (options) => {
    return new Promise((resolve, reject) => {
      console.log('start post operation with targetUrl', options.url);
  
      request({
        url: options.url,
        method: 'get',
        headers: options.headers,
      }, (error, response) => {
        if (!error && response.statusCode === 200) {
          resolve(response);
        } else {
          reject({
            error: error,
            response: response
          });
        }
      });
    });
  }

  let resp = async (url, headers) => {
      let finalResp = '';
    try {
        const response = await get({
          url: url,
          headers: headers
        });
        log.info(`Backend response.statusCode ${response.statusCode}`);
        log.info(`Backend response: ${response.body}`);
        finalResp = response.body;
      } catch (e) {
        log.error(`Full error: ${JSON.stringify(e)}`);
        finalResp = e;
      }   
      return finalResp;
};

module.exports = resp;
