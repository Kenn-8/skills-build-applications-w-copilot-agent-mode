import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users endpoint:', endpoint);
        console.log('Fetched users:', data);
        setUsers(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-3">Users <span className="badge bg-primary">{users.length}</span></h2>
          <button className="btn btn-primary mb-3">Add User</button>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.team ? u.team.name || u.team : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
