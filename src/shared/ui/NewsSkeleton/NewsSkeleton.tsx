import styles from './NewsSkeleton.module.css';

const NewsSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.inner}>
        <div className={`${styles.counter} skeleton`}></div>
        <div className={styles.content}>
          <div className={`${styles.title} skeleton`}></div>

          <div className={styles.metadata}>
            <div className={`${styles.rating} skeleton`} />
            <div className={`${styles.dotDivider} skeleton`} />
            <div className={`${styles.nickname} skeleton`} />
            <div className={`${styles.dotDivider} skeleton`} />
            <div className={`${styles.date} skeleton`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSkeleton;
