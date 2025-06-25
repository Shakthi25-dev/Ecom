import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productService';
import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getProductById(id).then(res => setInitialData(res.data));
  }, [id]);

  const handleSubmit = async (formData) => {
    await updateProduct(id, formData, localStorage.getItem('token'));
    navigate('/artisan/dashboard');
  };

  return initialData ? <ProductForm initialData={initialData} onSubmit={handleSubmit} /> : <p>Loading...</p>;
}
