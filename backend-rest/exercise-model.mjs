import 'dotenv/config';
import mongoose from 'mongoose';
const PORT = process.env.PORT;

const EXERCISE_DB_NAME = 'exercise_database';
const EXERCISE_CONNECTION = 'exercises';
const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let Exercise = undefined;

async function connect(dropCollection){
    try{
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISE_CONNECTION);
        }

        Exercise = createExerciseSchema();

    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

async function createConnection(){
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
    return mongoose.connection;
}
//use async and await and wrap functions inside async
//createExercise model
function createExerciseSchema(){
    const exerciseSchema = new mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, enum: ['lbs', 'kgs', 'miles'], required: true},
        date: {type: Date, required: true}
    });
    return connection.model(EXERCISE_CLASS, exerciseSchema, EXERCISE_CONNECTION);
}
//createExercise(req.body)
async function createExercise(exerciseData){
    const exercise = new Exercise(exerciseData);
    return exercise.save();
}
// getAllExercises()
async function getAllExercises(){
    return Exercise.find({});
}
//getExerciseById(id)
async function getExerciseById(id){
    return Exercise.findById(id);
}
//updateExerciseById(id, req.body)
async function updateExerciseById(id, exerciseData){
    return Exercise.findByIdAndUpdate(id, exerciseData, {new: true});
}
//deleteExerciseById(id)
async function deleteExerciseById(id){
    return Exercise.findByIdAndDelete(id);
}

export {connect, createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById};