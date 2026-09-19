import styles from './NewsCard.module.css';

const NewsCard = () => {
  return (
    <article className={styles.card}>
      <span className={styles.counter}>1.</span>
      <div className={styles.content}>
        <h3 className={styles.title}>Название</h3>
        <div className={styles.metadata}>
          <span>Рейтинг</span>
          <span>•</span>
          <span>Ник автора</span>
          <span>•</span>
          <span>Дата публикации</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
