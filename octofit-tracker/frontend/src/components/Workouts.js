import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-3">Workouts <span className="badge bg-primary">{workouts.length}</span></h2>
          <button className="btn btn-secondary mb-3">Add Workout</button>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Suggested For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, idx) => (
                <tr key={idx}>
                  <td>{w.name}</td>
                  <td>{w.suggested_for}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
