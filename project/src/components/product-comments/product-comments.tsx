import { useCallback, useState } from 'react';
import { ReviewsType } from '../../types/review';
import Comment from '../comment/comment';

type PropsType = {
  comments: ReviewsType[];
}

function ProductComments({ comments }: PropsType) {
  const [countComments, setCountComments] = useState(2);

  const handleShoeMoreButton = useCallback(() => {
    if (comments.length !== 0) {
      setCountComments(countComments + 2);
    }
  }, [countComments, comments.length]);

  //console.log(comments.slice().sort((b, a) => a.))
  return (
    <section className="comments">
      <h2 className="visually-hidden">Список комментариев</h2>
      <div className="container">
        <div className="comments__wrapper">
          {comments.slice(0, countComments).map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
        <div className="comments__show-more">
          {comments.length > 2 && countComments < comments.length && countComments !== comments.length &&
          <button className="btn btn--second comments__button" type="button" onClick={handleShoeMoreButton}>Показать еще</button>}
        </div>
      </div>
    </section>
  );
}

export default ProductComments;
