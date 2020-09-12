import React from 'react';
import './Loading.css';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className="loading">
       <Spinner animation="grow" variant="danger" />
       <Spinner animation="grow" variant="danger" />
       <Spinner animation="grow" variant="danger" />
    </div>
  );
}

export default Loading;