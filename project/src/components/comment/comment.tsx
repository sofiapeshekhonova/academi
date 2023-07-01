import { STARS } from '../../constants';
import { ReviewsType } from '../../types/review';
import Rating from '../rating/rating';

type PropsType = {
  comment: ReviewsType;
}

function Comment({comment}: PropsType) {
  const date = comment.isoDate.substring(0, 10);
  const month = comment.isoDate.substring(5, 7);
  const day = comment.isoDate.substring(8, 10);

  return (
    <div className="review">
      <div className="review__inner-wrapper">
        <time className="review__date" dateTime={date}>{day}.{month}</time>
        <span className="review__author">Уважаемый(-ая) {comment.user.name}</span>
        <div className="star-rating">
          {STARS.map((star) => (
            <Rating key={star.id} starId={star.id} star={star.rating} rating={comment.rating}/>
          ))}
        </div>
        <div className="review__text-wrapper">
          <p className="review__text">{comment.positive}</p>
          <p className="review__text">{comment.negative}</p>
        </div>
        <div className="review__image-wrapper">
          <picture>
            <source type="image/webp" srcSet={comment.user.avatarUrl} />
            <img src={comment.user.avatarUrl} width="162" height="162" alt={comment.user.name} />
          </picture>
        </div>
      </div>
    </div>
  );
}

export default Comment;

