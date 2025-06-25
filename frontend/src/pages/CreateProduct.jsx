import { createProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

function CreateProduct() {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    await createProduct(formData, localStorage.getItem('token'));
    navigate('/artisan/dashboard');
  };
  return <ProductForm onSubmit={handleSubmit} />;
}
