import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('/products');
        setProducts(res.data);
        setFiltered(res.data);
        setCategories([...new Set(res.data.map(p => p.category))]);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }
    fetchProducts();
  }, []);

  const handleFilter = (cat) => {
    if (!cat) return setFiltered(products);
    setFiltered(products.filter(p => p.category === cat));
  };

  return (
    <div className="p-4">
      <FilterPanel categories={categories} onFilter={handleFilter} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
