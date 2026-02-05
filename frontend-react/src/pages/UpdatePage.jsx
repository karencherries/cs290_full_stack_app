import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const UpdatePage = ({exerciseToUpdate = {}}) => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (exerciseToUpdate && exerciseToUpdate._id) {
      setName(exerciseToUpdate.name || '');
      setReps(exerciseToUpdate.reps || '');
      setWeight(exerciseToUpdate.weight || '');
      setUnit(exerciseToUpdate.unit || '');
      // Format date as YYYY-MM-DD for the input
      const dateStr = exerciseToUpdate.date;
      if (dateStr) {
        const formattedDate = dateStr.split('T')[0];
        setDate(formattedDate);
      }
    }
  }, [exerciseToUpdate]);

  const updateExercise = async () => {
    const updatedExercise = {name, reps: parseInt(reps), weight: parseFloat(weight), unit, date};
    const response = await fetch(
      `/exercises/${exerciseToUpdate._id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedExercise)
    });
    if (response.status === 200) {
      alert("Successfully updated the exercise!");
      navigate('/Retrieve');
    } else {
      const error = await response.json();
      alert(`Failed to update exercise, status code = ${response.status}. ${error.Error}`);
    }
  };

  return (
    <>
      {!exerciseToUpdate._id ? (
        <p>Please select an exercise to update from the Retrieve page.</p>
      ) : (
    <form onSubmit={e => {e.preventDefault(); updateExercise();}}>
      <p>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
      </p>
      <p>
        <label>
          Reps:
          <input
            type="number"
            value={reps}
            onChange={e => setReps(e.target.value)}
            required
          />
        </label>
      </p>
      <p>
        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
          />
        </label>
      </p>
      <p>
        <label>
          Unit:
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            required
          >
            <option value="">Select unit</option>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
            <option value="miles">miles</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>
      </p>
      <input type="submit" value="Update Exercise" />
    </form>
      )}
    </>
  );
};

export default UpdatePage;
