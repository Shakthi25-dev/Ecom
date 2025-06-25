import { useState, useEffect } from 'react';

function ProductForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: null,
    ...initialData,
  });

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      ...initialData,
    }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold">Product Form</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border w-full p-2"
        required
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="border w-full p-2"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border w-full p-2"
        required
      />
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border w-full p-2"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border w-full p-2"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border w-full p-2"
        accept="image/*"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

export default ProductForm;
