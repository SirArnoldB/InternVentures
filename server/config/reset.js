import { pool } from "./database.js";
import './dotenv.js';
import eventsData from '../data/events.json' assert { type: "json" };

// Create Events Table
const createEventsTable = async () => {

    // Create Events Table Query
    const createEventsTableQuery = `
    DROP TABLE IF EXISTS events;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        description TEXT NOT NULL,
        state_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
        )`

    // Create Events Table
    try {
        const res = await pool.query(createEventsTableQuery);
        console.log('🚀 Events created Successfully!', res);
    } catch (err) {
        console.log("🚨 Error creating Events table", err);
    }
};

// Seed Events Table
const seedEventsTable = async () => {
    // Create Events Table
    await createEventsTable();

    // Seed Events Table Query
    const seedEventsTableQuery = `
        INSERT INTO events (title, date, description, state_name, location, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)`

    // Seed Events Table
    try {
        eventsData.forEach(async (event) => {
            const res = await pool.query(seedEventsTableQuery, [event.title, event.date, event.description, event.state_name, event.location, event.image_url]);
            console.log('🚀 Events seeded Successfully!', res);
        });
    } catch (err) {
        console.log("🚨 Error seeding Events table", err);
    }
};

seedEventsTable();

// Create States Table
const createStatesTable = async () => {

    // Create States Table Query
    const createStatesTableQuery = `
    DROP TABLE IF EXISTS states;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS states (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        abbreviation VARCHAR(255) NOT NULL,
        flag_url VARCHAR(255) NOT NULL
        )`

    // Create States Table
    try {
        const res = await pool.query(createStatesTableQuery);
        console.log('🚀 States created Successfully!', res);
    } catch (err) {
        console.log("🚨 Error creating States table", err);
    }
};

// Seed States Table
const seedStatesTable = async () => {
    // Create States Table
    await createStatesTable();

    const statesData = await fetch('https://gist.githubusercontent.com/SirArnoldB/d6fb7f5faf24300acfd480d2f450f1cb/raw/6c05878f6943dc020ed72a444fd6ccc062813bee/us_states_flags.json')
        .then(response => response.json())
        .then(data => data);

    // Seed States Table Query
    const seedStatesTableQuery = `
        INSERT INTO states (name, abbreviation, flag_url)
        VALUES ($1, $2, $3);
        `;

    // Seed States Table
    try {
        statesData.forEach(async (state) => {
            const res = await pool.query(seedStatesTableQuery, [state.name, state.code, state.flag]);
            console.log('🚀 States seeded Successfully!', res);
        });
    } catch (err) {
        console.log("🚨 Error seeding States table", err);
    }
};

seedStatesTable();
