import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/item/${id}`);
        if (response.data.success) {
          setUser(response.data.data[0]); // Set the first item from the data array
        } else {
          setError('Failed to load user details');
        }
      } catch (error) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="UserDetails">
      <h2>User Details</h2>
      {user ? (
        <div><br></br>
          <p>Name: {user.nama}</p>
          <p>ID: {user.nik}</p>
          <p>Address: {user.alamat}</p>
          <p>Group: {user.golongan}</p>
          <p>Status: {user.status}</p>
          <br></br>
          <h3>Stock:</h3>
          <ul>
            {user.stok_gudang.map((stok) => (
                <div>
                    <li key={stok.id}>Stock Name: {stok.nama} ({stok.stok_gudang_qty} {stok.stok_gudang_satuan}) </li>
                </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserDetails;
