import { useLocation } from 'react-router-dom';

const useGetQueryParam = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryKeyword = searchParams.get('q');

  return queryKeyword;
};

export default useGetQueryParam;
