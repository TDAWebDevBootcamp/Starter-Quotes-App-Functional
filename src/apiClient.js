import axios from "axios";

export class ApiClient {
  resposeStatusCheck = (resObj) => {
    if (resObj.status >= 200 && resObj.status < 300) {
      return Promise.resolve(resObj);
    } else {
      return Promise.reject(new Error(resObj.status));
    }
  };

  getRequest = async (url) => {
    try {
      const req = await axios.get(url);
      const res = await this.resposeStatusCheck(req);
      return res;
    } catch (error) {
      return {
        content: "Error getting quote",
        author: "",
        tags: [],
        results: [],
      };
    }
  };

  fetchQuote = async () => {
    const response = await this.getRequest("http://quotable.io/random");
    return response.data;
  };

  fetchAuthors = async (skip) => {
    const authors = await this.getRequest(
      `http://quotable.io/authors?skip=${skip}&limit=20`
    );
    return authors.data;
  };

  fetchQuoteByAuthor = async (authorId) => {
    let quote = await this.getRequest(
      `https://quotable.io/quotes?authorId=${authorId}`
    );
    return quote.data;
  };
}
