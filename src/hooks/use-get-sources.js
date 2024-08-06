import { useQuery } from 'react-query';
import newsApi from '../api/services/news-api';

const SOURCES = [
  { id: 'the-guardian', name: 'The Guardian' },
  { id: 'ny-times', name: 'The New York Times' },
];

export const useGetSources = () => {
  const { data: newsApiSources = [] } = useQuery(['news-api-sources'], () => newsApi.fetchAndCacheSources());

  const allSources = [...newsApiSources, ...SOURCES];
  allSources.sort((a, b) => a.name.localeCompare(b.name));

  return allSources;
};
