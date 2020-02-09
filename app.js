const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');


const app = express();

//parse JSON from req.body
app.use(express.json({ extended: true }));

app.use('/api/auth',authRoutes);
app.use('/api/event', eventRoutes);

// connect to mondoDB and start listening
async function start() {
    const PORT = config.get('port') || 5000;
    const mongoURI = config.get('mongoUri');
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`);
        });
    } catch (e) {
        console.log('Server error: ', e);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

start();