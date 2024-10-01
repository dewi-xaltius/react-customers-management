import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCustomer from './EditCustomer';  // Import the EditCustomer component

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);  // State for the customer being edited
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://demo1-4744.restdb.io/rest/customers', {
          headers: { 'x-apikey': API_KEY },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, [API_KEY]);

  // Handle the Edit button click, setting the customer to be edited
  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
  };

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.customerName} - {customer.customerEmail}
            <button onClick={() => handleEditClick(customer)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Show the EditCustomer component if a customer is selected for editing */}
      {editingCustomer && (
        <EditCustomer
          customerId={editingCustomer._id}
          customerName={editingCustomer.customerName}
          customerEmail={editingCustomer.customerEmail}
        />
      )}
    </div>
  );
};

export default CustomerList;
