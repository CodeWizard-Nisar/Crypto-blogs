import axios from "axios";

const NEWS_API_KEY = process.env.REACT_APP_API_KEY;

const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=c8a969ec096b4637b078df8d33223449`;

export const getNews = async () => {
  let response;

  try {
    response = await axios.get(NEWS_API_ENDPOINT);
    response = response.data.articles.slice(0, 15);
  } catch (error) {
    return error;
  }
  return response;
};
