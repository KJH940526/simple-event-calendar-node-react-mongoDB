const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Event = require('../models/event');
const auth = require('../middleware/auth.middleware');

const router = Router();

const download = multer({ dest: 'temp' });


const mapDataToEvent = (events) => {
    return events
        .map(({ _id, start, duration, title }) => ({
            id: _id,
            start,
            duration,
            title
        }));
}

// /api/event   get all events by user
router.get('/', auth, async (req, res) => {
    try {
        let events = await Event.find({ owner: req.user.userId });
        events = mapDataToEvent(events);
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

// /api/event/json load JSON file
router.get('/json', auth, download.none(), async (req, res) => {
    try {
        let events = await Event.find({ owner: req.user.userId });
        events = mapDataToEvent(events);


        // write data to temp file
        const filePath = path.join(__dirname, "..", "temp", "events.json");
        await fs.writeFile(filePath, JSON.stringify(events), err => {
            if (err) throw err;
        });

        //send data
        res.sendFile(filePath);

        // remove temp file
        // await fs.unlink(filePath,err=>{
        //     if(err) throw err;
        // });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something is went terribly wrong, please try again' });
    }
});


module.exports = router;