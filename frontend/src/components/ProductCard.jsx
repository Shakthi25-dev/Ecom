import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="block border p-4 rounded shadow hover:shadow-lg">
      <img src={`/uploads/${product.image}`} alt={product.title} className="w-full h-48 object-cover mb-2" />
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-600 text-sm">₹{product.price}</p>
    </Link>
  );
}

export default ProductCard;
