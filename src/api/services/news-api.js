import { getCachedData } from '../../utils/get-cached-data';
import ApiHandler from '../api-handler';

class NewsApi extends ApiHandler {
  constructor() {
    super('https://newsapi.org/v2/', process.env.REACT_APP_NEWS_API_KEY, 'apiKey');
  }

  async fetchArticles({ page, source, category, keyword, startDate, endDate }) {
    try {
      const endpoint = source || keyword ? 'everything' : 'top-headlines';
      const params = {
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 10,
        page,
        sources: !category && source ? source : undefined,
        category: category ? category.id : undefined,
        q: keyword,
        from: startDate ? this.formatDateToYYYYMMDD(startDate) : undefined,
        to: endDate ? this.formatDateToYYYYMMDD(endDate) : undefined,
      };
      const data = await this.fetchData(endpoint, params);
      return this.formatArticles(data.articles, category);
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  formatArticles(articles, category) {
    return articles?.reduce((formattedArticles, article) => {
      if (article.url !== 'https://removed.com') {
        formattedArticles.push({
          source: article?.source.name,
          author: article?.author,
          category: category?.name || 'General',
          title: article?.title,
          description: article?.description,
          date: article?.publishedAt,
          url: article?.url,
          image: article?.urlToImage,
        });
      }
      return formattedArticles;
    }, []);
  }

  async fetchAndCacheSources() {
    const CACHE_KEY = 'newsApiSources';
    const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const cachedData = getCachedData({ key: CACHE_KEY, expiration: CACHE_EXPIRATION });
    if (cachedData) return cachedData;

    try {
      const data = await this.fetchData('sources', { language: 'en' });
      const sources = data?.sources.map((source) => ({
        id: source.id,
        name: source.name,
        category: source.category,
      }));
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: sources, timestamp: Date.now() }));
      return sources;
    } catch (error) {
      return [];
    }
  }
}

export default new NewsApi();
