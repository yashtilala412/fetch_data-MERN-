import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner'; // Import the Spinner component

function ReadIdols() {
  const [idols, setIdols] = useState([]);
  const [editIdol, setEditIdol] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchIdols = async () => {
      try {
        const response = await axios.get('http://localhost:3000/idols');
        setIdols(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchIdols();
  }, []);

  const handleEdit = (idolId) => {
    setEditIdol(idolId);
  };

  const handleSave = async (idolId) => {
    const editedIdol = idols.find(idol => idol._id === idolId);
    try {
      const response = await axios.patch(`http://localhost:3000/idols/${idolId}`, editedIdol);
      console.log(response.data);
      // Update the state to reflect the changes
      const updatedIdols = idols.map(idol => {
        if (idol._id === idolId) {
          return response.data;
        }
        return idol;
      });
      setIdols(updatedIdols);
      setEditIdol(null); // Reset edit mode
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (idolId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/idols/${idolId}`);
      console.log(response.data);
      // Update the state to remove the deleted idol
      setIdols(prevIdols => prevIdols.filter(idol => idol._id !== idolId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e, field, idolId) => {
    const updatedValue = e.target.value;
    const updatedIdols = idols.map(idol => {
      if (idol._id === idolId) {
        return {
          ...idol,
          [field]: updatedValue
        };
      }
      return idol;
    });
    setIdols(updatedIdols);
  };

  return (
    <div>
      <h2>All Idols</h2>
      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <ul>
          {idols.map(idol => (
            <li key={idol._id}>
              {editIdol === idol._id ? (
                <>
                  <input type="text" value={idol.name} onChange={(e) => handleChange(e, 'name', idol._id)} />
                  <input type="text" value={idol.height} onChange={(e) => handleChange(e, 'height', idol._id)} />
                  <input type="text" value={idol.category} onChange={(e) => handleChange(e, 'category', idol._id)} />
                  <input type="text" value={idol.price} onChange={(e) => handleChange(e, 'price', idol._id)} />
                  <button onClick={() => handleSave(idol._id)}>Save</button>
                </>
              ) : (
                <>
                  {idol.name} - {idol.height} - {idol.category} - {idol.price}
                  <button onClick={() => handleEdit(idol._id)}>Edit</button>
                  <button onClick={() => handleDelete(idol._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReadIdols;
