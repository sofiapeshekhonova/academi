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


  const x: ReviewsType[] = [];
  const commentsNew = [...x, ...comments];

  //сортировка по дате по умолчанию и она бы работала. если бы с сервера приходили бы верные даты
  const sorted = commentsNew.splice(0).sort((a, b) => a.isoDate < b.isoDate ? 1 : -1);

  return (
    <section className="comments">
      <h2 className="visually-hidden">Список комментариев</h2>
      <div className="container">
        <div className="comments__wrapper">
          {sorted.slice(0, countComments).map((comment) => (
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
