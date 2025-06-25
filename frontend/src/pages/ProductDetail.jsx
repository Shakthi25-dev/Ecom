import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useCart from '../hooks/useCart';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`/products/single/${id}`); // Fixed endpoint
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src={`/uploads/${product.image}`} alt={product.title} className="w-full h-96 object-cover" /> 
      <h1 className="text-2xl font-bold my-2">{product.title}</h1> 
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      <p className="mb-4">{product.description}</p>
      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
