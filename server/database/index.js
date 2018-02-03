const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    database: 'bbadger',
    charset: 'utf8',
  }
});

knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('email');
      table.string('password');
      table.string('first_name');
      table.string('last_name');
      table.string('street');
      table.string('zip_code');
      table.string('state');
      table.string('phone');
      table.string('school');
    }).then(() => console.log('created table users'))
  }
})

knex.schema.hasTable('loan_payments').then(exists => {
  if (!exists) {
    knex.schema.createTable('loan_payments', table => {
      table.increments('id').primary();
      table.decimal('amount', 14, 2);
      table.string('date');
      table.integer('loan_id');
      table.integer('user_id');
    }).then(() => console.log('created table loan_payments'))
  }
})

knex.schema.hasTable('loans').then(exists => {
  if (!exists) {
    knex.schema.createTable('loans', table => {
      table.increments('id').primary();
      table.string('name');
      table.decimal('amount', 14, 2);
      table.decimal('interest_rate', 14, 2);
      table.string('recurrence');
      table.string('inception_date');
      table.string('end_date');
      table.integer('user_id');
    }).then(() => console.log('created table loans'))
  }
})

knex.schema.hasTable('transactions').then(exists => {
  if (!exists) {
    knex.schema.createTable('transactions', table => {
      table.increments('id').primary();
      table.string('plaid_id');
      table.integer('user_id');
      table.string('category');
      table.string('account_id');
      table.string('amount');
      table.string('date');
      table.string('name');
      table.string('street');
      table.string('zip_code');
      table.string('state');
    }).then(() => console.log('created table transactions'))
  }
})

knex.schema.hasTable('daily_transactions').then(exists => {
  if (!exists) {
    knex.schema.createTable('daily_transactions', table => {
      table.increments('id').primary();
      table.string('plaid_id');
      table.integer('user_id');
      table.string('category');
      table.string('account_id');
      table.string('amount');
      table.string('date');
      table.string('name');
      table.string('street');
      table.string('zip_code');
      table.string('state');
    }).then(() => console.log('created table daily_transactions'))
  }
})

knex.schema.hasTable('accounts').then(exists => {
  if (!exists) {
    knex.schema.createTable('accounts', table => {
      table.string('id').primary();
      table.integer('user_id');
      table.string('bank_name');
      table.string('type');
      table.integer('current_balance');
      table.integer('limit');
      table.string('bank_id');
    }).then(() => console.log('created table accounts'))
  }
})

knex.schema.hasTable('schools').then(exists => {
  if (!exists) {
    knex.schema.createTable('schools', table => {
      table.increments('id').primary();
      table.string('name');
    }).then(() => console.log('created table schools'));
  }
})

knex.schema.hasTable('banks').then(exists => {
  if (!exists) {
    knex.schema.createTable('banks', table => {
      table.string('id').primary();
      table.string('access_token');
      table.integer('user_id');
      table.string('last_updated');
      table.string('previous_updated');
    }).then(() => console.log('created table banks'));
  }
})

knex.schema.hasTable('bills').then(exists => {
  if (!exists) {
    knex.schema.createTable('bills', table => {
      table.increments('id').primary();
      table.integer('user_id');
      table.integer('bill_category_id');
      table.string('description');
      table.decimal('amount',14,2);
      table.date('due_date');
      table.boolean('paid');
      table.date('paid_date');
      table.boolean('alert');
    }).then(() => console.log('created table bills'))
  }
})

knex.schema.hasTable('bill_categories').then(exists => {
  if (!exists) {
    knex.schema.createTable('bill_categories', table => {
      table.increments('id').primary();
      table.string('name');
    }).then(() => console.log('created table bill_categories'))
  }
})

const db = require('bookshelf')(knex);

module.exports = { db, knex };
