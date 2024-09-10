import { useMemo } from 'react';
import { useFilters } from '../../context/FilterContext';

const AuthorFilter = ({ articles }) => {
  const authors = useMemo(() => {
    if (!articles) return [];
    const uniqueAuthors = new Set();
    articles.forEach((article) => {
      if (article?.author) uniqueAuthors.add(article.author);
    });
    return Array.from(uniqueAuthors).sort();
  }, [articles]);

  const { selectedAuthor, handleSelectAuthor } = useFilters();

  return (
    <select
      onChange={handleSelectAuthor}
      value={selectedAuthor}
      className="w-full rounded border px-2 py-2 md:w-1/3 md:px-4"
    >
      <option value="">Authors</option>
      {authors?.map((author) => (
        <option key={author} value={author}>
          {author}
        </option>
      ))}
    </select>
  );
};

export default AuthorFilter;
