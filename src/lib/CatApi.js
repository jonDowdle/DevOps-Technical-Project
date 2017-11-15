'use strict';
const axios = require('axios');
const parseString = require('xml2js').parseString;
const baseUrl = 'https://thecatapi.com/api';

var CatApi = function( api_key = '' ){
  this.api_key = api_key;

  // eslint-disable-next-line no-console
  if( this.api_key.length ) console.log('Utilizing Cat API key 🐱');

  var restLib = axios.create({
    baseURL: baseUrl,
    timeout: 1000
  });

  this.get = function() {
    return restLib.get(`/images/get?format=xml&api_key=${this.api_key}`).then( (resp) => {
      return parseXml(resp.data).then( flatten );
    });
  };
  return this;
};

function parseXml(xml) {
  return new Promise( (resolve, reject ) => {
    parseString(xml, (err, result ) => {
      if( err ) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function flatten(responseData) {
  return new Promise( (resolve, reject) => {
    try {
      let imageData = responseData.response.data[0].images[0].image[0];
      let flattened = {
        image: {
          url: imageData.url[0],
          id: imageData.id[0],
          source_url: imageData.source_url[0]
        }
      };
      resolve(flattened);
    } catch (e) {
      reject(e);
    }

  });
}

module.exports = CatApi;
