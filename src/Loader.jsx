// src/Loader.js
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div className="loader-container">
      <Spinner animation="border" variant="primary" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
}

export default Loader;
