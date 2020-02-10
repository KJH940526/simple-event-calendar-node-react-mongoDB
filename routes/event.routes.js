const { Router } = require('express');

const Event = require('../models/event');
const auth = require('../middleware/auth.middleware');

const router = Router();



const mapDataToEvent = (events) => {
    return events
        .map(({ _id, start, duration, title }) => ({
            id: _id,
            start,
            duration,
            title
        }));
};

const mapDataToPlainEvent = (events) => events.map(({ start, duration, title }) => ({ start, duration, title }));


// /api/event   get all events by user
router.get('/', auth, async (req, res) => {
    try {
        let events = await Event.find({ owner: req.user.userId });
        if (req.query.json) {
            events = mapDataToPlainEvent(events);
        } else {
            events = mapDataToEvent(events);
        }
        res.json(events);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something is went terribly wrong, please try again' });
    }
});


// /api/event/add add new event
router.post('/add', auth, async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            owner: req.user.userId
        });
        let savedEvent = await event.save();
        savedEvent = mapDataToEvent([savedEvent]);
        res.status(201).json(...savedEvent);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something is went terribly wrong, please try again' });
    }
});

// /api/event/remove remove event
router.delete('/remove/:id', auth, async (req, res) => {
    try {
        let event = await Event.findOneAndRemove({ _id: req.params.id });
        res.status(200).send(event._id);
    } catch (e) {
        console.log('Error: ', e);
        res.status(500).json({ message: 'Unable to remove event!' })
    }
});

module.exports = router;