import { NavLink, useParams } from 'react-router-dom';
import { useNewsDetailsStore } from '@/stores';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { CommentsList } from '@/components';
import { Routes } from '@/shared/lib';
import styles from './DetailsNewsPage.module.css';

const DetailsNewsPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const newsStore = useNewsDetailsStore();
  const detailsNews = newsStore.detailsNews;

  useEffect(() => {
    void newsStore.fetchCurrentNews(+id);
    return newsStore.clear;
  }, [id, newsStore]);

  return (
    <div className={styles.container}>
      <NavLink to={Routes.news}>Go back</NavLink>

      <button
        className="button"
        onClick={() => newsStore.fetchCurrentNews(+id)}
      >
        Update comments
      </button>

      {detailsNews && (
        <div className={styles.content}>
          <span className={styles.title}>{detailsNews.title}</span>
          <div className={styles.metadata}>
            <a href={detailsNews.url} target="_blank" className={styles.link}>
              Link to the news
            </a>
            <span>
              {new Date(detailsNews.time * 1000).toLocaleDateString('ru-RU')}
            </span>
          </div>

          <span>
            by <b>{detailsNews.by}</b>
          </span>
          <CommentsList />
        </div>
      )}
    </div>
  );
});

export default DetailsNewsPage;
