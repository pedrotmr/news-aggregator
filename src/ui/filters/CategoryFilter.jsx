import { useFilters } from '../../context/FilterContext';
import { useGetCategories } from '../../hooks/use-get-categories';

const CategoryFilter = () => {
  const { selectedCategory, handleSelectCategory } = useFilters();
  const categories = useGetCategories();

  return (
    <select
      onChange={handleSelectCategory}
      value={selectedCategory ? selectedCategory.id : ''}
      className="w-full rounded border px-2 py-2 md:w-1/3 md:px-4"
    >
      <option value="">Categories</option>
      {categories?.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
