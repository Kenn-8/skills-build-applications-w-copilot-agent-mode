import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-3">Activities <span className="badge bg-primary">{activities.length}</span></h2>
          <button className="btn btn-success mb-3">Add Activity</button>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>User Email</th>
                <th>Activity</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, idx) => (
                <tr key={idx}>
                  <td>{a.user_email}</td>
                  <td>{a.activity}</td>
                  <td>{a.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
