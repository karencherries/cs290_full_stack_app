function ExerciseRow({ exercise, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return dateString.split('T')[0]
  };

  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{formatDate(exercise.date)}</td>
      <td>
        <button onClick={() => onEdit(exercise)}>Edit</button>
        <button onClick={() => onDelete(exercise._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default ExerciseRow;
