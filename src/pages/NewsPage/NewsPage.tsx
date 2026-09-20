import { NewsCard, NewsSkeleton } from '@/shared/ui';
import { useNewsStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import type { Story } from '@/shared/api';
import { NavLink } from 'react-router-dom';
import { Routes } from '@/shared/lib';
import styles from './NewsPage.module.css';

const NewsPage = observer(() => {
  const newsStore = useNewsStore();

  useEffect(() => {
    newsStore.startAutoRefresh();
    return () => newsStore.stopAutoRefresh();
  }, []);

  const updateNews = () => {
    newsStore.startAutoRefresh();
  };

  return (
    <div className={styles.news__list}>
      <button
        className="button"
        onClick={updateNews}
        disabled={newsStore.isLoading}
      >
        Update News
      </button>

      {newsStore.isLoading
        ? Array.from({ length: 100 }).map((_, index) => (
            <NewsSkeleton key={index} />
          ))
        : newsStore.news.length &&
          newsStore.news.map((story: Story, index: number) => (
            <NavLink
              to={Routes.detailsNews.replace(':id', String(story.id))}
              key={story.id}
            >
              <NewsCard
                story={story}
                counter={index + 1}
                openDetailStory={() => {}}
              />
            </NavLink>
          ))}
    </div>
  );
});

export default NewsPage;
