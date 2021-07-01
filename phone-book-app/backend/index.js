// Init express
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const dbWriter = require("./dbWriter");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
morgan.token("content-body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content-body"))

// Data model
let persons = require("./db.json").persons;

// Get requests
app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

// Post requests
app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (body) {
        const id = Math.max(...persons.map(p => p.id)) + 1;
        const person = {
            ...body,
            id
        }

        if (person.id 
            && person.name
            && person.number
            && !persons.some(p => p.name === person.name)) {
            persons = [...persons, person];
            dbWriter.writeToJSON(persons);
            res.status(200).send(persons);
        } else {
            res.status(400).end();
        }
    } else {
        res.status(400).end();
    }
});

// Put requests
app.put("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const number = req.body.number;
    const personIndex = persons.findIndex(p => p.id === id);
    if (personIndex) {
        const newPersons = [...persons];
        newPersons[personIndex].number = number;
        persons = newPersons;
        dbWriter.writeToJSON(persons);
        res.status(200).send(persons);
    } else {
        res.status(404).end();
    }
})

// Delete requests
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);

    if (persons.some(p => p.id === id)) {
        persons = [...persons.filter(p => p.id !== id)];
        dbWriter.writeToJSON(persons);
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

// handle unkown endpoints
const unkownEndpoints = (req, res) => {
    res.status(404).send({error: "Unkown endpoint"})
}
app.use(unkownEndpoints);

// Listen
const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));