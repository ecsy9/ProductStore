import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Product Page</h1>
      <p>Viewing product with ID: {id}</p>
    </div>
  );
};

export default ProductPage;
