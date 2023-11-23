const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connecting to MongoDB
mongoose.connect('mongodb://localhost/registrationDB', {
 useNewUrlParser: true,
 useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
 console.log('Connected to MongoDB');
});

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});

//Creating a user schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 firstName: String,
 lastName: String,
 email: String,
 password: String,
 phone: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;

//Creating a user model
const User = require('./userModel');
// Handle form submission
app.post('/register', async (req, res) => {
 try {
 const newUser = new User(req.body);
 await newUser.save();
 res.status(201).send(newUser);
 } catch (error) {
 res.status(400).send(error);
 }
});
