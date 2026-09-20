import { NewsCard, NewsSkeleton } from '@/shared/ui';
import { useNewsStore } from '@/stores';
import styles from './NewsPage.module.css';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import type { Story } from '@/shared/api';

const NewsPage = observer(() => {
  const newsStore = useNewsStore();

  useEffect(() => {
    newsStore.startAutoRefresh();
    return () => newsStore.stopAutoRefresh();
  }, []);

  return (
    <div className={styles.news__list}>
      {newsStore.isLoading
        ? Array.from({ length: 100 }).map((_, index) => (
            <NewsSkeleton key={index} />
          ))
        : newsStore.news.length &&
          newsStore.news.map((story: Story, index: number) => (
            <NewsCard key={story.id} story={story} counter={index + 1} />
          ))}
    </div>
  );
});

export default NewsPage;
