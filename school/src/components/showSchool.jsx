import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch data from backend
    axios
      .get("http://localhost:5000/api/schools") // adjust port if needed
      .then((res) => {
        setSchools(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load schools");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading schools...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    
    <div className="schools-container">
   
      <h2 className="page-title">List of Schools</h2>
      
      {schools.length === 0 ? (
        <div className="no-schools">No schools found. Add some schools to see them here.</div>
      ) : (
        <div className="schools-grid">
          {schools.map((school) => (
            <div key={school.id} className="school-card">
              <img 
                src={`http://localhost:5000/${school.image}`} 
                alt={school.name} 
                className="school-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/250x150?text=Image+Not+Found";
                }}
              />
              
              <div className="school-details">
                <h3 className="school-name">{school.name}</h3>
                <p className="school-address">{school.address}</p>
                <p className="school-city">{school.city}, {school.state}</p>
                <p className="school-contact">{school.contact}</p>
                <p className="school-email">{school.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowSchools;