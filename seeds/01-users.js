exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'bob', password: 'upndown', department: 'sales'},
    {username: 'slingblade', password: 'biscuits', department: 'customer service'},
    {username: 'verna', password: 'wafflehouse', department: 'IT'}
  ]);
};

