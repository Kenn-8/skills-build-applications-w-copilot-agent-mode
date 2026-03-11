import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaderboard(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-3">Leaderboard <span className="badge bg-primary">{leaderboard.length}</span></h2>
          <button className="btn btn-info mb-3">Refresh Leaderboard</button>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>User Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((l, idx) => (
                <tr key={idx}>
                  <td>{l.user_email}</td>
                  <td>{l.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
