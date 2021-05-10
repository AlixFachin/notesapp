
exports.up = function(knex) {
  return knex.schema.createTable('notes', (table) => { 
    table.increments('id').unsigned().primary();
    table.string('summary').notNull();
    table.text('message').notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
