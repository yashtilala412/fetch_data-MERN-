import React, { useState } from 'react';
import axios from 'axios';

function CreateIdolForm() {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    category: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/idols', formData);
      console.log(response.data);
      // Clear form fields after successful submission
      setFormData({
        name: '',
        height: '',
        category: '',
        price: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add New Idol</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="Height" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <button type="submit">Add Idol</button>
      </form>
    </div>
  );
}

export default CreateIdolForm;
