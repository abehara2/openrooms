const request = require('request')

module.exports = {
    /*
    ** This method returns a promise
    ** which gets resolved or rejected based
    ** on the result from the API
    */
    make_API_call : function(url){
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
              if (err) reject(err)
              resolve(body)
            });
        })
    },

    make_API_Post : function(url, form){
        return new Promise((resolve, reject) => {
            request.post(url, form, function(error, response, body){
                console.log(body);
              });
        })
    }
}