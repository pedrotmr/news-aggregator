class ApiHandler {
  constructor(baseUrl, apiKey, apiKeyParamName = 'api-key') {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.apiKeyParamName = apiKeyParamName;
  }

  async fetchData(endpoint, params = {}) {
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      return [];
    }
  }

  buildUrl(endpoint, params) {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    this.appendParams(url, params);
    url.searchParams.append(this.apiKeyParamName, this.apiKey);
    return url;
  }

  appendParams(url, params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== '') {
        url.searchParams.append(key, value);
      }
    });
  }
}

export default ApiHandler;
