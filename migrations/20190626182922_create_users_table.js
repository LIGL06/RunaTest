exports.up = (knex) => {
    return knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('email', 100);
      table.text('password')
      table.string('legalName', 100);
      table.string('legalRfc', 13);
      table.boolean('admin', 0);
      table.timestamps();
    })
  };
  
  exports.down = () => {
    process.stdout.write('Ignoring down migration for users\n');
  };
  