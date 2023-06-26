import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './User.css';

const User = () => {
  const [user_id, setUser_Id] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [company, setCompany] = useState('');
  const [owner, setOwner] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [shipmentRequest, setShipmentRequest] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [shipmentSize, setShipmentSize] = useState('');
  const [boxCount, setBoxCount] = useState('');
  const [specification, setSpecification] = useState('');
  const [checklistQuantity, setChecklistQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    // Add your own validation logic based on the requirements

    // Store the details in MySQL customer table
    const customerDetails = {
      user_id,
      orderDate,
      company,
      owner,
      item,
      quantity,
      weight,
      shipmentRequest,
      trackingId,
      shipmentSize,
      boxCount,
      specification,
      checklistQuantity,
    };

    // Send the customerDetails to the server to store in MySQL
    fetch('/storeDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Details stored successfully');
        toast.success('Details stored successfully');
        // Reset the form fields after successful submission if needed
        // ...
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred');
        // Handle error if the details couldn't be stored
        // ...
      });
  };
  
  const handleLogout = () => {
    // Perform logout logic here

    // Display logout toast message
    toast.success('Logged out successfully');

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="user-container">
      <h2 className="user-heading">Customer Form</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <label>
          User_id:
          <input
            type="number"
            value={user_id}
            onChange={(e) => setUser_Id(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Order Date:
          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Owner:
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Item:
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Weight:
          <input
            type="number"
            step="0.01"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Shipment Request:
          <input
            type="text"
            value={shipmentRequest}
            onChange={(e) => setShipmentRequest(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Tracking ID:
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Shipment Size (L*B*H):
          <input
            type="text"
            value={shipmentSize}
            onChange={(e) => setShipmentSize(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Box Count:
          <input
            type="number"
            value={boxCount}
            onChange={(e) => setBoxCount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Specification:
          <input
            type="text"
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Checklist Quantity:
          <input
            type="text"
            value={checklistQuantity}
            onChange={(e) => setChecklistQuantity(e.target.value)}
            required
          />
        </label>
        <br />
        <button id="submitbtm" type="submit">Submit</button>
        <div className="user-logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default User;
