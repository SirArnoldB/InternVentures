import pg from 'pg';

// Create a configuration object for the database
const config = {
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
};

// Create a connection pool to the Postgres database instance with the configuration object
export const pool = new pg.Pool(config);