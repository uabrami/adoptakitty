const { Pool} = require('pg');
const path = require('path');
const { config } = require('./config');
// const pool = new Pool(config);
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

// const pool = new Pool({
  //   user: 'postgres',
  //   host: '127.0.0.1',
  //   database: 'SDC',
  //   password: '',
  //   port: 5432,
  // });

const seedPostgres = async () => {
  const client = await pool.connect();

  try {
    console.time('timing seed');
    // Transaction BEGIN!
    await client.query('BEGIN');
    console.log('creating catinfo table!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS catinfo(
        name VARCHAR(100),
        breed VARCHAR(100),
        image VARCHAR(100),
        city VARCHAR(100),
        state VARCHAR(100)
        );
    `);

    console.log('writing to database!');
    const copyPath = '/Users/umaabrami/Desktop/HRR37/hrr37-MVP/adoptakitty/catData.csv';
    // /Users/umaabrami/Desktop/HRR37/hrr37-MVP/adoptakitty/catData.csv
    console.log(copyPath)
    const envPath = '/var/lib/pgsql92/actorData.csv'
    await client.query(`
      COPY catinfo FROM '${copyPath}' WITH (FORMAT CSV, HEADER);
    `);

    console.log('adding auto serial index column named "id"!');
    await client.query(`
      ALTER TABLE catinfo ADD COLUMN id SERIAL PRIMARY KEY;
    `);

  console.log('adding index to column named "id"!');
  await client.query(`
  CREATE INDEX idindexcat ON catinfo(id);
  `);
    console.log('creating owner table!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner(
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(100),
        week VARCHAR(100),
        weekday VARCHAR(100),
        timeblock VARCHAR(100),
        catId VARCHAR(100),
        );
    `);

    console.log('adding auto serial index column named "id"!');
    await client.query(`
      ALTER TABLE owner ADD COLUMN id SERIAL PRIMARY KEY;
    `);

    console.log('adding owner id index to column named "id"!');
    await client.query(`
    CREATE INDEX idindexowner ON owner(id);
    `);

    console.log('commiting!');
    await client.query('COMMIT');
    // Transaction END!
    console.timeEnd('timing seed');
  } catch (e) {
    await client.query('ROLLBACK');
    console.log('error!');
    throw e;
  } finally {
    console.log('releasing...');
    await client.release();
  }
};

seedPostgres().catch(e => console.error(e.stack));
