import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();
export const useFilters = () => useContext(FilterContext);

export const FiltersProvider = ({ children }) => {
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState();

  const handleSelectSource = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelectedSource(selectedId ? { name: selectedName, id: selectedId } : null);
    setSelectedCategory(null);
  };

  const handleSelectCategory = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelectedCategory(selectedId ? { name: selectedName, id: selectedId } : null);
    setSelectedSource(null);
  };

  const handleSelectAuthor = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleSelectStartDate = (date) => {
    setSelectedStartDate(date);
  };

  const handleSelectEndDate = (date) => {
    setSelectedEndDate(date);
  };

  const clearFilters = () => {
    setSelectedSource(null);
    setSelectedCategory(null);
    setSelectedAuthor('');
    setSelectedStartDate('');
    setSelectedEndDate('');
  };

  return (
    <FilterContext.Provider
      value={{
        selectedSource,
        handleSelectSource,
        selectedCategory,
        handleSelectCategory,
        selectedAuthor,
        handleSelectAuthor,
        selectedStartDate,
        handleSelectStartDate,
        selectedEndDate,
        handleSelectEndDate,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
