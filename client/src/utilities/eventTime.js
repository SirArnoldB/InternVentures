const eventTime = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffMs = event - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        return `${diffDays} days until the event`;
    } else if (diffDays < 0) {
        return `${Math.abs(diffDays)} days since the event`;
    } else {
        return 'The event is today';
    }
}

export {
    eventTime
}