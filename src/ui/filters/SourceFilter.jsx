import { useFilters } from '../../context/FilterContext';
import { useGetSources } from '../../hooks/use-get-sources';

const SourceFilter = () => {
  const sources = useGetSources();
  const { selectedSource, handleSelectSource } = useFilters();

  return (
    <select
      onChange={handleSelectSource}
      value={selectedSource ? selectedSource.id : ''}
      className="w-full rounded border px-2 py-2 md:w-1/3 md:px-4"
    >
      <option value="">Sources</option>
      {sources?.map((source) => (
        <option key={source.id} value={source.id} name={source.name}>
          {source.name}
        </option>
      ))}
    </select>
  );
};

export default SourceFilter;
