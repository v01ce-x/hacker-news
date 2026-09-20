import { observer } from 'mobx-react-lite';
import { useNewsDetailsStore } from '@/stores';
import { CommentItem } from '@/components';
import styles from './CommentsList.module.css';

const CommentsList = observer(() => {
  const { detailsNews, isCommentsLoading } = useNewsDetailsStore();
  const kids = detailsNews?.kids;

  if (!kids || kids.length === 0) {
    return <p className={styles.commentsEmpty}>Комментариев пока нет</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Comments ({detailsNews?.descendants ?? 0})</h3>
        {isCommentsLoading && <span style={{ color: '#fff' }}>Update...</span>}
      </div>

      <div>
        {kids.map((kidId) => (
          <CommentItem key={kidId} id={kidId} />
        ))}
      </div>
    </div>
  );
});

export default CommentsList;
