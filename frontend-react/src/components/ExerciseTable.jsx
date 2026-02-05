import ExerciseRow from './ExerciseRow.jsx';

function ExerciseTable({ exercises, onDelete, onEdit }) {

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => {
          const exerciseId = exercise._id ? exercise._id : exercise.id
          return <ExerciseRow
            key={exerciseId}
            exercise={exercise}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        })}
      </tbody>
    </table>
  );
}

export default ExerciseTable;
