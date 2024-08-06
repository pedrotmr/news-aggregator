import { useCallback, useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getAllArticles } from '../api/get-all-articles';
import { useFilters } from '../context/FilterContext';
import useGetQueryParam from './use-get-query-param';

const useGetArticles = () => {
  const { selectedSource, selectedCategory, selectedAuthor, selectedStartDate, selectedEndDate } =
    useFilters();

  const queryKeyword = useGetQueryParam();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: ['news', selectedSource, selectedCategory, queryKeyword, selectedStartDate, selectedEndDate],
    queryFn: ({ pageParam = 1 }) =>
      getAllArticles({
        page: pageParam,
        source: selectedSource?.id,
        category: selectedCategory,
        keyword: queryKeyword,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      }),
    getNextPageParam: (lastPage, allPages) => (lastPage.length > 0 ? allPages.length + 1 : undefined),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (!node || isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const flattenedArticles = useMemo(
    () =>
      data?.pages
        ?.flatMap((page) => page)
        .filter((article) => !selectedAuthor || article.author === selectedAuthor),
    [data, selectedAuthor],
  );

  return {
    data: flattenedArticles,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    lastElementRef,
  };
};

export default useGetArticles;
