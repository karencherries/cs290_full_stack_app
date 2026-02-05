
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exerciseModel from './exercise-model.mjs';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const ERROR_NOT_FOUND = {"Error": "Not found"};
const app = express();

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database and start server
(async () => {
    try {
        await exerciseModel.connect(false);
        app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();

// write a function to validate request body of data
function validateData(req, res){
    const name = req.body.name;
    //check if name is a string
    if (typeof name !== 'string'){
        return false;
    }
    const reps = req.body.reps;
    //check if reps is a positive integer
    if (!Number.isInteger(reps) || reps < 0) {
        return false;
    }
    const weight = req.body.weight;
    //check if weight is a positive number
    if (isNaN(weight) || weight < 0) {
        return false;
    }
    const unit = req.body.unit;
    //check if unit is either "lbs" or "kgs" or "miles"
    if (unit !== "lbs" && unit !== "kgs" && unit !== "miles") {
        return false;
    }
    const date = req.body.date;
    //if date is not provided, set it to current date
    if (!date) {
        req.body.date = Date.now();
    } else {
        //validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return false;
        }
    }
    return true;
}
// POST /exercises : validate request body to return responses

app.post('/exercises', asyncHandler(async (req, res) => {
    if (!validateData(req, res)){
        return res.status(400).json({"Error": "Invalid request"});
    }
    else {
        const exercise = await exerciseModel.createExercise(req.body);
        return res.status(201).json(exercise);
    }
}));

// GET /exercises : return all exercises
app.get('/exercises', asyncHandler(async (req, res) => {
    const exercises = await exerciseModel.getAllExercises();
    if (exercises.length === 0) {
        //return empty array if collection is empty
        return res.json([]);
        
    }
    return res.status(200).json(exercises);
}));
// GET /exercises/:id : return exercise with given id on path parameter
app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const exercise = await exerciseModel.getExerciseById(id);
    if (!exercise) {
        return res.status(404).json(ERROR_NOT_FOUND);
    }
    return res.status(200).json(exercise);
}));
// PUT /exercises/:id : update exercise with given id on path parameter
app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!validateData(req, res)){
        return res.status(400).json({"Error": "Invalid request"});
    }
    const updatedExercise = await exerciseModel.updateExerciseById(id, req.body);
    if (!updatedExercise) {
        return res.status(404).json(ERROR_NOT_FOUND);
    }
    return res.status(200).json(updatedExercise);
}));
// DELETE /exercises/:id : delete exercise with given id on path parameter
app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedExercise = await exerciseModel.deleteExerciseById(id);
    if (!deletedExercise) {
        return res.status(404).json(ERROR_NOT_FOUND);
    }
    //no response body
    return res.status(204).send();
}));

// Serve index.html for all other routes (React Router)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});












