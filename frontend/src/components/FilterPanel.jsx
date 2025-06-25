function FilterPanel({ categories, onFilter }) {
  return (
    <div className="mb-4">
      <select onChange={(e) => onFilter(e.target.value)} className="border p-2 rounded">
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterPanel;