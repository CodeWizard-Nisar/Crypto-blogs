import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import styles from "./Home.module.css";

function Home() {
  const [articles, setArticles] = useState([]);

  const handdleCardClick = (url) => {
    window.open(url, "_blank"); //open in new tab
  };

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();
    //cleanup function
    setArticles([]);
  }, []);
  return (
    <>
      <div className={styles.header}>Latest Articles</div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div
            className={styles.card}
            key={article.url}
            onClick={() => handdleCardClick(article.url)}
          >
            <img src={article.urlToImage} />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
