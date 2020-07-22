const Joi = require('joi');
const express = require('express');
const app = express();
const generateId = require('./util.js/generateID');

app.use(express.json());

const courses = [
    { id: '134', name: 'mca'},
    { id: '121', name: 'bca'},
    { id: '156', name: 'mcs'},
    { id: '786', name: 'biotech'}
];

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// using courseId as the route parameter
app.get('/api/courses/:courseId', (req, res) => {
    const course = courses.find(c => c.id === req.params.courseId);
    if (!course) res.status(404).send(`${res.statusCode} Course not available for courseId = ${req.params.courseId}`);
    res.send(course);
});

// handling POST request 
app.post('/api/courses', (req, res) => {
    const courseId = generateId();
    
    // schema defines that courseName a mandatory field must be string of min length = 5  
    const schema = {
        courseName : Joi.string().min(5).required()
    }

    const result = Joi.validate(req.body, schema);

    // if Joi returns error return error code + message
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
    }

    // else set the item id with random number and courseName
    const item = {
        id: courseId.toString(),
        name: req.body.courseName
    }

    // push the item to the list and return the item added
    if(item && item.name) {
        courses.push(item);
        res.send(`new course added : ${JSON.stringify(courses)}`);
    }
});

app.listen(3000, () => console.log('listening to prot 3000!'));