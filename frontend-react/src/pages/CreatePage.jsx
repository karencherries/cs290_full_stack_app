import {useState} from 'react';
import {useNavigate} from 'react-router-dom';



const CreatePage = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const addExercise = async () => {
    const newExercise = {
      name, 
      reps: parseInt(reps), 
      weight: parseFloat(weight), 
      unit, 
      date
    };
    const response = await fetch(
      '/exercises', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newExercise)
    });
    if (response.status === 201) {
      alert("Successfully added the exercise!");
      navigate('/Retrieve');
    } else {
      const error = await response.json();
      alert(`Failed to add exercise, status code = ${response.status}. ${error.Error}`);
    }
  };

  return (

    <form onSubmit={e => {e.preventDefault(); addExercise();}}>
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
      <button type="submit">Add Exercise</button>
    </form>
  );
}

export default CreatePage;
