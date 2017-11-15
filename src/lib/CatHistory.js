const Redis = require('ioredis');
const redis = new Redis(6379, 'redis');

module.exports = {
  log: function( item ){
    let toStore = item;
    redis.rpush('cats', JSON.stringify(toStore));
    return item;
  },

  get: function(){
    return redis.lrange('cats', 0, -1).then( (data) => {
      return data;
    });
  }

};
