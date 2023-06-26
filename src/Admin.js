import React, { useEffect, useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [totalData, setTotalData] = useState({});
  const [userIdData, setUserIdData] = useState([]);

  useEffect(() => {
    fetch('/adminData')
      .then((response) => response.json())
      .then((data) => {
        setTotalData(data.totalResult);
        setUserIdData(data.userIdResult);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Dashboard</h2>

      <div className="admin-data">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Total Quantity</th>
              <th>Total Weight</th>
              <th>Total Box Count</th>
            </tr>
          </thead>
          <tbody>
            {userIdData.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.total_quantity}</td>
                <td>{user.total_weight}</td>
                <td>{user.total_box_count}</td>
              </tr>
            ))}
            <tr>
              <td rowSpan="4" className="total-data">
                <h3>Total Data:</h3>
              </td>
              <td rowSpan="4" className="total-data">
              <p>{totalData.total_quantity}</p>
              </td>
              <td rowSpan="4" className="total-data">
              <p>{totalData.total_weight}</p>
              </td>
              <td rowSpan="4" className="total-data">
              <p>{totalData.total_box_count}</p>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
