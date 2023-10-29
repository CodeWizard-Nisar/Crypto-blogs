import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import styles from "./Home.module.css";
import Loader from "../../Components/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();
    //cleanup function
    setArticles([]);
  }, []);
  const handdleCardClick = (url) => {
    window.open(url, "_blank"); //open in new tab
  };
  if (articles.length == 0) {
    return <Loader text="homepage" />;
  }
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
