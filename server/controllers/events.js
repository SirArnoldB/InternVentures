import { pool } from "../config/database.js";

// Get all events 
const getAllEvents = async (_, res) => {
    try {
        const events = await pool.query(
            "SELECT * FROM events ORDER BY id ASC"
        );
        res.status(200).json(events.rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get an event by id
const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await pool.query(
            "SELECT * FROM events WHERE id = $1",
            [id]
        );
        res.status(200).json(event.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new event
const createEvent = async (req, res) => {
    const { title, date, description, state_name, location, image_url } = req.body;

    try {
        const newEvent = await pool.query(
            "INSERT INTO events (title, date, description, state_name, location, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, date, description, state_name, location, image_url]
        );
        res.status(201).json(newEvent.rows[0]);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

// Update an event by id
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, description, state_name, location, image_url } = req.body;

    try {
        const updatedEvent = await pool.query(
            "UPDATE events SET title = $1, date = $2, description = $3, state_name = $4, location = $5, image_url = $6 WHERE id = $7 RETURNING *",
            [title, date, description, state_name, location, image_url, id]
        );
        res.status(200).json(updatedEvent.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an event by id
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            "DELETE FROM events WHERE id = $1",
            [id]
        );
        res.status(200).json({ message: "Event deleted successfully." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All States with their event counts. 
const getStatesEventsCount = async (_, res) => {
    try {
        const states = await pool.query(
            "SELECT states.id, states.name, states.flag_url, COUNT(events.id) AS event_count FROM states LEFT JOIN events ON states.name = events.state_name GROUP BY states.id ORDER BY states.name ASC"
        );
        res.status(200).json(states.rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all events for a specific state
const getStateEvents = async (req, res) => {
    try {
        const { state } = req.params;
        const events = await pool.query(
            "SELECT * FROM events WHERE state_name = $1 ORDER BY id ASC",
            [state]
        );
        res.status(200).json(events.rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export default {
    getAllEvents, getStatesEventsCount, getEvent, getStateEvents, createEvent, updateEvent, deleteEvent
};