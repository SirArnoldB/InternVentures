import express from 'express';
import EventsController from '../controllers/events.js';

const router = express.Router();

// GET all events
router.get('/', EventsController.getAllEvents);

// Get State Event Count
router.get('/state_event_count', EventsController.getStatesEventsCount);

// GET all events for a specific state
router.get('/states_events/:state', EventsController.getStateEvents);

// GET a specific event by ID
router.get('/:id', EventsController.getEvent);

// POST a new event
router.post('/', EventsController.createEvent);

// PUT (update) an existing event by ID
router.put('/:id', EventsController.updateEvent);

// DELETE an event by ID
router.delete('/:id', EventsController.deleteEvent);

export default router;