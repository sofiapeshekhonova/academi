import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { STARSS, Status } from '../../constants';
import StarsInput from '../stars-input/stars-input';
import { postProductCommentsAction } from '../../store/api-actions';
import { getCommentStatus } from '../../store/comments/selectors';

type PropsType = {
  roomId: string;
}
function ReviewForm({roomId}: PropsType) {
  const dispatch = useAppDispatch();

  const postStatus = useAppSelector(getCommentStatus);
  //const minCharacters = 5;
  //const maxCharacters = 400;
  const [formData, setFormData] = useState({
    rating: 0,
    positive: '',
    negative: '',
    id : roomId
  });

  function handleChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(postProductCommentsAction(formData));
    // if(postStatus === Status.Failed) {
    //   console.log('dada')
    //   // setFormData({rating: 0, positive: '', negative: '', id:''});
    // }
  }

  // const disabled = () => {
  //   if (formData.rating > 3) {
  //     return formData.negative.length <= 50 || formData.rating === 0 || formData.negative.length >= 400 || postStatus === Status.Loading;
  //   } else {
  //     return formData.negative.length <= 50 || formData.rating === 0 || formData.negative.length >= 400 || postStatus === Status.Loading;
  //   }
  // };
  return (
    <section className="review-form">
      <div className="container">
        <div className="review-form__wrapper">
          <h2 className="review-form__title">оставить отзыв</h2>
          <div className="review-form__form">
            <form action="#" method="post" autoComplete="off" onSubmit={handleSubmit}>
              <div className="review-form__inputs-wrapper">
                <div className="custom-input">
                  <label>
                    <span className="custom-input__label">Достоинства</span>
                    <input type="text" name="positive" placeholder="Достоинства" required={formData.rating > 3}
                      id="positive"
                      value={formData.positive}
                      onChange={handleChange}
                      disabled={postStatus === Status.Loading}
                    />
                  </label>
                </div>
                <div className="custom-input">
                  <label>
                    <span className="custom-input__label">Недостатки</span>
                    <input type="text" name="negative" placeholder="Недостатки" required={formData.rating < 4}
                      id="negative"
                      value={formData.negative}
                      onChange={handleChange}
                      disabled={postStatus === Status.Loading}
                    />
                  </label>
                </div>
              </div>
              <div className="review-form__submit-wrapper">
                <div className="review-form__rating-wrapper">
                  <div className="input-star-rating">
                    {STARSS.map((star) => (
                      <StarsInput key={star.id} name={star.name} starId={star.id} value={formData.rating} onChange={handleChange} postStatus={postStatus} />
                    ))}
                  </div>
                </div>
                <div className="review-form__button-wrapper">
                  <button className="btn review-form__button" type="submit">
                    {/* disabled={disabled()}
                  > */}
                    {postStatus === Status.Loading ? 'Загрузка' : 'Отправить отзыв'}
                  </button>
                </div>
                {/* <p className="reviews__description">
        To post review please make sure to set <b>rating </b>
        and describe the film with at least <b>{minCharacters} characters</b>.
        {(formData.comment && formData.comment.length < minCharacters + 1) && <b> Сharacters left: {minCharacters + 1 - formData.comment.length}</b>}
        {(formData.comment && formData.comment.length >= maxCharacters) && <b > Max {maxCharacters} Сharacters</b>}
      </p> */}
                {postStatus === Status.Failed && <p>Something gooing wrong...</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewForm;
