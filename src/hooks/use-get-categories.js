import { useQuery } from 'react-query';
import theGuardianApi from '../api/services/the-guardian';

const NY_TIMES_CATEGORIES = [
  { id: 'arts', name: 'Arts' },
  { id: 'automobiles', name: 'Automobiles' },
  { id: 'books', name: 'Books' },
  { id: 'business', name: 'Business' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'food', name: 'Food' },
  { id: 'health', name: 'Health' },
  { id: 'home', name: 'Home' },
  { id: 'insider', name: 'Insider' },
  { id: 'magazine', name: 'Magazine' },
  { id: 'movies', name: 'Movies' },
  { id: 'opinion', name: 'Opinion' },
  { id: 'politics', name: 'Politics' },
  { id: 'realestate', name: 'Real Estate' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'sundayreview', name: 'Sunday Review' },
  { id: 'technology', name: 'Technology' },
  { id: 'theater', name: 'Theater' },
  { id: 't-magazine', name: 'T Magazine' },
  { id: 'travel', name: 'Travel' },
  { id: 'us', name: 'US' },
  { id: 'world', name: 'World' },
];

const NEWS_API_CATEGORIES = [
  { id: 'business', name: 'Business' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'general', name: 'General' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sport', name: 'Sport' },
  { id: 'technology', name: 'Technology' },
];

export const useGetCategories = () => {
  const { data: theGuardianCategories = [] } = useQuery(['guardian-categories'], () =>
    theGuardianApi.fetchAndCacheCategories(),
  );

  const allCategories = [...theGuardianCategories, ...NY_TIMES_CATEGORIES, ...NEWS_API_CATEGORIES].reduce(
    (acc, category) => {
      if (!acc.some((item) => item.id === category.id)) {
        acc.push(category);
      }
      return acc;
    },
    [],
  );
  allCategories.sort((a, b) => a.name.localeCompare(b.name));

  return allCategories;
};
