const { Pool} = require('pg');
const { config } = require('./config');

// const path = require('path');
const pool = new Pool({
  user: config.user,
  host:  config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

const getAllCats = async (id) => {
  const getQuery = {
    name: 'get-All-Cats',
    text: 'SELECT * from catinfo',
  }
  try {
    const res = await pool.query(getQuery);
    return res.rows;
  } catch (e) {
    console.log(e.stack);
    throw e;
  }
};

const createUpdateOwner = async(firstname, lastname, email, week, weekday, timeblock, catid) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log('inside function');
    const firstQuery = await client.query('INSERT INTO owner (firstname, lastname, email, week, weekday, timeblock, catid) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO UPDATE SET WEEK = EXCLUDED.week, WEEKDAY = EXCLUDED.weekday, TIMEBLOCK=EXCLUDED.timeblock, CATID=EXCLUDED.catid', [firstname, lastname, email, week, weekday, timeblock, catid]);
    console.log('1st query executed', firstQuery.command);
    await client.query('COMMIT');
    return firstQuery.rowCount;
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
};

const deleteOwner = async (email) => {
  const deleteQuery = {
    name: 'delete-owner',
    text: `DELETE FROM owner WHERE email=$1`,
    values: [email],
  }
  try {
    const res = await pool.query(deleteQuery);
    return res.rows;
  } catch (e) {
    console.log(e.stack);
    throw e;
  }
};

// const createOwner = async(firstname, lastname, email, week, weekday, timeblock, catid) => {
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     console.log('inside function');
//     const firstQuery = await client.query('INSERT INTO owner (firstname, lastname, email, week, weekday, timeblock, catid)VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id', [firstname, lastname, email, week, weekday, timeblock, catid]);
//     console.log('1st query executed', firstQuery);
//     await client.query('COMMIT');
//     return firstQuery.rows[0].id;
//   } catch (e) {
//     await client.query('ROLLBACK');
//     throw e;
//   } finally {
//     client.release();
//   }
// };


module.exports = {
  getAllCats,
  createUpdateOwner,
  deleteOwner
};