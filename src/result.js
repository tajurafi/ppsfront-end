import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Results = ({ results }) => {
  const navigate = useNavigate();

  const approveRequest = async (id, e) => {
    e.stopPropagation(); // Stop event propagation to prevent navigation
    try {
      await axios.put(`http://localhost:8000/item/approved/${id}`);
      window.location.reload(); // Reload the page to refresh data
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const rejectRequest = async (id, e) => {
    e.stopPropagation(); // Stop event propagation to prevent navigation
    try {
      await axios.put(`http://localhost:8000/item/rejected/${id}`);
      window.location.reload(); // Reload the page to refresh data
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleMoreDetailsClick = (id, e) => {
    e.stopPropagation(); // Stop event propagation to prevent navigation
    navigate(`/user/${id}`);
  };

  return (
    <div className="ApprovalList">
      {results.map((result) => (
        <div 
          key={result.id} 
          className="user-item relative flex flex-wrap justify-between"
        >
          <div onClick={() => handleUserClick(result.id)} className="cursor-pointer flex-1">
            <p>Name: {result.nama}</p>
            <p>ID: {result.nik}</p>
            <p>Status: {result.status}</p>
          </div>
          <div className="flex space-x-2 mt-4">
            {result.status === 'AWAITING_APPROVAL' && (
              <div className="flex space-x-2">
                <button 
                  onClick={(e) => approveRequest(result.id, e)} 
                  className="px-3 rounded-md"
                >
                  Approve
                </button>
                <button 
                  onClick={(e) => rejectRequest(result.id, e)} 
                  className="px-3 rounded-md"
                >
                  Reject
                </button>
              </div>
            )}
            <button
              onClick={(e) => handleMoreDetailsClick(result.id, e)}
              className="bottom left rounded-full flex items-center justify-center"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
