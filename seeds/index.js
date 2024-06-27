const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const stadium = require('./stadiums');
const manager = require('./manager')
const formation = require('./formation')
const logos = require('./logos')
const Club = require('../models/club');

mongoose.connect('mongodb://127.0.0.1:27017/dream-eleven')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Club.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const club = new Club({
            author: '64da4c4ab4702adc931f4ee0',
            clubName: `${sample(places)} ${sample(descriptors)}`,
            stadium: `${sample(stadium)}`,
            manager: `${sample(manager)}`,
            formation: `${sample(formation)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dww7z1rbn/image/upload/v1692463867/DreamEleven/q0nnxd7moe8awn3iredp.png',
                    filename: 'DreamEleven/q0nnxd7moe8awn3iredp',
                }
            ],
        })
        await club.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})