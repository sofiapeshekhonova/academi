import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MAX_CHARACTERS, MIN_CHARACTERS, STARSS, Status } from '../../constants';
import StarsInput from '../stars-input/stars-input';
import { postProductCommentsAction } from '../../store/api-actions';
import { getCommentStatus } from '../../store/comments/selectors';

type PropsType = {
  roomId: string;
  setOpenReview: (tab: boolean) => void;
  openReview: boolean;
}

function ReviewForm({ roomId, setOpenReview, openReview }: PropsType) {
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector(getCommentStatus);
  const [form, setForm] = useState(true);
  const [formData, setFormData] = useState({
    rating: 0,
    positive: '',
    negative: '',
    id: roomId
  });

  function handleChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(postProductCommentsAction(formData));
    setForm(false);
  }

  const disabled = () => {
    if (formData.rating > 3) {
      return formData.positive.length <= MIN_CHARACTERS || formData.rating === 0 || formData.positive.length >= MAX_CHARACTERS || postStatus === Status.Loading;
    } else if(formData.rating < 4) {
      return formData.negative.length <= MIN_CHARACTERS || formData.rating === 0 || formData.negative.length >= MAX_CHARACTERS || postStatus === Status.Loading;
    }
  };


  useEffect(() => {
    if (postStatus === Status.Success && form === false) {
      setFormData({ rating: 0, positive: '', negative: '', id: '' });
      setOpenReview(false);
    }

  }, [postStatus, formData.rating, setOpenReview]);

  return (
    <section className="review-form">
      <div className="container">
        <div className="review-form__wrapper">
          <h2 className="review-form__title">оставить отзыв</h2>
          <div className="review-form__form">
            <form action="#" method="post" autoComplete="off" onSubmit={handleSubmit} noValidate>
              <div className="review-form__inputs-wrapper">
                <div className="custom-input">
                  <label>
                    <span className='custom-input__message' style={{ paddingRight: '30px' }}>
                      {(formData.positive && formData.positive.length < MIN_CHARACTERS + 1) && <b> Нужно ввести {MIN_CHARACTERS} символа</b>}
                      {(formData.positive && formData.positive.length > MIN_CHARACTERS + 1 && !(formData.positive.length >= MAX_CHARACTERS + 1)) && <b> Осталось символов: {MAX_CHARACTERS + 1 - formData.positive.length}</b>}
                      {(formData.positive && formData.positive.length >= MAX_CHARACTERS + 1) && <b > Максимально {MAX_CHARACTERS} Символов </b>}
                    </span>
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
                    <span className='custom-input__message' style={{ paddingRight: '30px' }}>
                      {(formData.negative && formData.negative.length < MIN_CHARACTERS + 1) && <b> Нужно ввести {MIN_CHARACTERS} символа</b>}
                      {(formData.negative && formData.negative.length > MIN_CHARACTERS + 1 && !(formData.negative.length >= MAX_CHARACTERS + 1)) && <b> Осталось символов: {MAX_CHARACTERS + 1 - formData.negative.length}</b>}
                      {(formData.negative && formData.negative.length >= MAX_CHARACTERS + 1) && <b > Максимально {MAX_CHARACTERS} Символов </b>}
                    </span>
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
                  <button className="btn review-form__button" type="submit" disabled={disabled()}>
                    {postStatus === Status.Loading ? 'Загрузка' : 'Отправить отзыв'}
                  </button>
                </div>
                <p style={{ color: 'red' }}>
                  Для отправки ревью необходимо поставить <b> рейтинг </b>
                  {formData.rating < 4 && formData.rating !== 0 && ` и заполнить поле "Недостатки" ${MIN_CHARACTERS} символами`}
                  {formData.rating > 3 && `и заполнить поле "Достоинства" ${MIN_CHARACTERS} символами`}
                </p>
                {postStatus === Status.Failed && <p>Something gooing wrong...</p>}
              </div>
            </form>
          </div>
        </div>
      </div >
    </section >
  );
}

export default ReviewForm;
