import newsApi from './services/news-api';
import nyTimesApi from './services/ny-times';
import theGuardianApi from './services/the-guardian';

const apiClients = {
  'ny-times': nyTimesApi,
  'the-guardian': theGuardianApi,
};

export const getAllArticles = async ({ page, source, category, keyword, startDate, endDate }) => {
  const fetchParams = { page, category, keyword, startDate, endDate };

  if (source) {
    const apiClient = apiClients[source];
    if (apiClient) return apiClient.fetchArticles(fetchParams);
    return newsApi.fetchArticles({ ...fetchParams, source });
  }

  const articlesResults = await Promise.all([
    nyTimesApi.fetchArticles(fetchParams),
    theGuardianApi.fetchArticles(fetchParams),
    newsApi.fetchArticles(fetchParams),
  ]);

  return articlesResults.flat();
};
