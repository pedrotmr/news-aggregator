import { formatDateToYYYYMMDD } from '../../utils/date';
import { getCachedData } from '../../utils/get-cached-data';
import ApiHandler from '../api-handler';

class TheGuardianApi extends ApiHandler {
  constructor() {
    super('https://content.guardianapis.com/', process.env.REACT_APP_THE_GUARDIAN_API_KEY);
  }

  async fetchArticles({ page, category, keyword, startDate, endDate }) {
    try {
      const params = {
        'show-fields': 'byline,thumbnail,trailText',
        'page-size': 10,
        page,
        section: category ? category.id : undefined,
        q: keyword,
        'from-date': startDate ? formatDateToYYYYMMDD(startDate) : undefined,
        'to-date': endDate ? formatDateToYYYYMMDD(endDate) : undefined,
      };
      const data = await this.fetchData('search', params);
      return this.formatArticles(data.response.results);
    } catch (error) {
      return [];
    }
  }

  formatArticles(articles) {
    return articles.map((article) => ({
      source: 'The Guardian',
      author: article.fields.byline,
      category: article.sectionName,
      title: article.webTitle,
      description: article.fields.trailText,
      date: article.webPublicationDate,
      url: article.webUrl,
      image: article.fields.thumbnail,
    }));
  }

  async fetchAndCacheCategories() {
    const CACHE_KEY = 'guardianCategories';
    const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const cachedData = getCachedData({ key: CACHE_KEY, expiration: CACHE_EXPIRATION });
    if (cachedData) return cachedData;

    try {
      const data = await this.fetchData('sections');
      const categories = data.response.results.map((category) => ({
        id: category.id,
        name: category.webTitle,
        type: category.type,
      }));
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: categories, timestamp: Date.now() }));
      return categories;
    } catch (error) {
      return [];
    }
  }
}

export default new TheGuardianApi();
