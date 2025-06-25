function ProductForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
    ...initialData,
  });

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
      formData.append(key, value);
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border w-full p-2" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border w-full p-2" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border w-full p-2" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border w-full p-2" />
      <input type="file" name="image" onChange={handleChange} className="border w-full p-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
    </form>
  );
}
