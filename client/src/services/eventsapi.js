import { request } from "../utilities/api";

const eventsURL = '/events';

const getAllEvents = () => request('GET', eventsURL);
const getEvent = (id) => request('GET', `${eventsURL}/${id}`);
const getStateEvents = (state) => request('GET', `${eventsURL}/states_events/${state}`);
const getStatesEventsCount = () => request('GET', `${eventsURL}/state_event_count`);
const createEvent = (event) => request('POST', eventsURL, event);
const updateEvent = (id, event) => request('PUT', `${eventsURL}/${id}`, event);
const deleteEvent = (id) => request('DELETE', `${eventsURL}/${id}`);

export default {
    getAllEvents, getEvent, getStateEvents, getStatesEventsCount, createEvent, updateEvent, deleteEvent
}
