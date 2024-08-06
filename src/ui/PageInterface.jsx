import useGetArticles from '../hooks/use-get-articles';
import ArticlesList from '../ui/ArticlesList';
import AuthorFilter from '../ui/filters/AuthorFilter';
import CategoryFilter from '../ui/filters/CategoryFilter';
import DateFilter from '../ui/filters/DateFilter';
import SourceFilter from '../ui/filters/SourceFilter';
import IndicatorText from '../ui/IndicatorText';

const PageInterface = ({ isHome }) => {
  const { data, isLoading, isFetching, hasNextPage, lastElementRef } = useGetArticles();

  if (isLoading) {
    return <IndicatorText text="Loading news..." />;
  }

  return (
    <>
      <div className="my-4 flex flex-col justify-around gap-2 text-sm md:flex-row md:text-base">
        <SourceFilter />
        <CategoryFilter />
        {isHome ? <AuthorFilter articles={data} /> : <DateFilter />}
      </div>

      <ArticlesList articles={data} lastElementRef={lastElementRef} />

      {isFetching && <IndicatorText text="Loading more news..." />}
      {!hasNextPage && <IndicatorText text="No more news" />}
    </>
  );
};

export default PageInterface;
