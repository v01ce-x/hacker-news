import styles from './NewsCard.module.css';
import type { Story } from '@/shared/api';

interface Props {
  story: Story;
  counter: number;
  openDetailStory: () => void;
}

const NewsCard = (props: Props) => {
  const { story, counter, openDetailStory } = props;

  return (
    <article className={styles.card} onClick={openDetailStory}>
      <span className={styles.counter}>{counter}.</span>
      <div className={styles.content}>
        <h3 className={styles.title}>{story.title}</h3>
        <div className={styles.metadata}>
          <span>Rating {story.score}&#9733;</span>
          <span>•</span>
          <span>by {story.by}</span>
          <span>•</span>
          <span>{new Date(story.time * 1000).toLocaleDateString('ru-RU')}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
