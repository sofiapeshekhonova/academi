import { Status } from '../../constants';
import { useAppSelector } from '../../hooks';
import ErrorPage from '../../pages/error-page/error-page';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { getLastComment, getLastCommentStatus } from '../../store/comments/selectors';
import Comment from '../comment/comment';

function LastReview() {
  const comment = useAppSelector(getLastComment);
  const lastCommentStatus = useAppSelector(getLastCommentStatus);

  if(lastCommentStatus === Status.Failed) {
    return <ErrorPage />;
  }

  return (
    <section className="last-review">
      <div className="container">
        <h2 className="last-review__title">последний отзыв</h2>
        {comment === null ? <LoadingScreen /> : <Comment comment={comment} /> }
      </div>
    </section>
  );
}

export default LastReview;
