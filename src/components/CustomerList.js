import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);  // State to hold the list of customers
  const API_KEY = process.env.REACT_APP_API_KEY;   // Access the API key from the .env file

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Fetch customer data from the RestDB API
        const response = await axios.get('https://demo1-4744.restdb.io/rest/customers', {
          headers: {
            'x-apikey': API_KEY,
          },
        });
        setCustomers(response.data);  // Store customer data in state
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, [API_KEY]);  // Only run once, when the component mounts

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.customerName} - {customer.customerEmail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
