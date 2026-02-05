import {Link} from "react-router-dom";
import ExerciseTable from "../components/ExerciseTable";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function RetrievePage({setExerciseToUpdate}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
      const response = await fetch('/exercises')
      const data = await response.json();
      setExercises(data);
    };

    useEffect(() => {
      loadExercises();
    }, []);

    const handleDelete = async (_id) => {
      const response = await fetch(
        `/exercises/${_id}`,
        { method: 'DELETE' });
      if (response.status === 204) {
        loadExercises();
      }
    };

    const handleEdit = (exercise) => {
      setExerciseToUpdate(exercise);
      navigate('/Update');
    };

    return (
      <>
        <h1>Retrieve Exercises</h1>
        <ExerciseTable 
          exercises={exercises}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <Link to="/">Go Back</Link>
      </>
    );
}
export default RetrievePage;
