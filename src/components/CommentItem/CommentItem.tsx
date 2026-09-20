import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNewsDetailsStore } from '@/stores';
import styles from './CommentItem.module.css';

interface Props {
  id: number;
}

const CommentItem = observer((props: Props) => {
  const { id } = props;

  const store = useNewsDetailsStore();
  const comment = store.comments[id];
  const [isOpen, setIsOpen] = useState(false);

  if (!comment) {
    return <div className={styles.isLoading}>Loading...</div>;
  }

  const hasKids = Boolean(comment.kids && comment.kids.length > 0);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState && comment.kids) {
      void store.fetchComments(comment.kids);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <strong>{comment.by}</strong>
        <span>&bull;</span>
        <span>
          {new Date(comment.time * 1000).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>

        {hasKids && (
          <button onClick={handleToggle} className={styles.button}>
            {isOpen ? '[-] hide' : `[+] reveal (${comment.kids!.length})`}
          </button>
        )}
      </div>

      {isOpen && (
        <>
          {comment.text && (
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          )}

          {hasKids && (
            <div>
              {comment.kids!.map((kidId) => (
                <CommentItem key={kidId} id={kidId} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default CommentItem;
