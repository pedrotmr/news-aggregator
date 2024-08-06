import { formatDateToYYYYMMDD } from '../../utils/date';
import ApiHandler from '../api-handler';

class NewYorkTimesApi extends ApiHandler {
  constructor() {
    super('https://api.nytimes.com/svc/search/v2/articlesearch.json', process.env.REACT_APP_NY_TIMES_API_KEY);
  }

  async fetchArticles({ page, category, keyword, startDate, endDate }) {
    try {
      const params = {
        page: page,
        sort: 'newest',
        fq: category ? `section_name:"${category}"` : undefined,
        q: keyword,
        begin_date: startDate ? formatDateToYYYYMMDD(startDate).replace(/-/g, '') : undefined,
        end_date: endDate ? formatDateToYYYYMMDD(endDate).replace(/-/g, '') : undefined,
      };
      const data = await this.fetchData('', params);
      return this.formatArticles(data.response.docs);
    } catch (error) {
      return [];
    }
  }

  formatArticles(articles) {
    return articles.map((article) => ({
      source: article.source,
      author: article.byline?.person?.[0]?.firstname
        ? article.byline?.person?.[0]?.firstname + ' ' + article.byline?.person?.[0]?.lastname
        : article.byline?.original,
      category: article.section_name,
      title: article.headline.main,
      description: article.abstract,
      date: article.pub_date,
      url: article.web_url,
      image: `https://www.nytimes.com/${article.multimedia?.[0]?.url}`,
    }));
  }
}

export default new NewYorkTimesApi();
