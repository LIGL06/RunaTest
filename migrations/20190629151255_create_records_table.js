exports.up = (knex) => {
    return knex.schema.createTable('records', function (table) {
      table.increments('id');
      table.integer('user').unsigned().notNullable();
      table.foreign('user').references('id').inTable('users');
      table.date('day');
      table.timestamps();
    })
  };
  
exports.down = () => {
process.stdout.write('Ignoring down migration for records\n');
};
  