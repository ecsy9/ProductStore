import React from 'react';
import { useProductStore } from '../../store/useProductStore';
import { useEffect } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const {products,loading,error, fetchProducts} = useProductStore();

    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);

    return(
        <main className='mx-auto max-w-7xl p-4'>
        <div className='flex justify-between items-center mb-8'>
            <button className='btn btn-primary'>
                Add Product
            </button>
            <button className='btn btn-ghost' onClick={fetchProducts}>
                <RefreshCwIcon className='w-6 h-6' />
            </button>
        </div>

        {error && <div className='alert alert-error mb-4'>{error}</div>}

        {loading ? (
            <div className='flex justify-center items-center h-64'>
            <div className='loading loading-spinner loading-lg'></div>
            </div>
        ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}

        </main>
    )
};

export default HomePage;
