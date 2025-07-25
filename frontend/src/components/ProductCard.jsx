import { Edit } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';
import { EditIcon,Trash2Icon } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className='relative pt-[56.25%]'>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </figure>

      <div className='card-body'>
        <h2 className='card-title'>{product.name}</h2>
        <p className='text-sm'>{product.description}</p>
        <div className='mt-4'>
          <span className='text-lg font-bold'>${product.price}</span>
        </div>

        {/* CARD ACTIONS */}
        <div className='card-actions'>
          <Link to={`/product/${product.id}`} className='btn btn-primary btn-sm'>
            <EditIcon className='w-4 h-4 mr-1' />
          </Link>

          <button className='btn btn-secondary btn-sm'>
            <Trash2Icon className='w-4 h-4 mr-1' />
          </button>

        </div>

      </div>
    </div>
  )
};

export default ProductCard;