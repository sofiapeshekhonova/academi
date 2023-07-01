import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { STARSS, Status } from '../../constants';
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
  const minCharacters = 5;
  const maxCharacters = 400;
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
  }

  // ТАКУЮ ВАЛИДАЦИЮ НУЖНО ДЕЛАТЬ ПО ВАШИМ УСЛОВИЯМ, НО ОНА НЕ ПРОХОДИТ, Т.к. ваш север простит ОБА поля заполненны при любом рейтинге
  // const disabled = () => {
  //   if (formData.rating > 3) {
  //     return formData.positive.length <= minCharacters || formData.rating === 0 || formData.positive.length >= maxCharacters || postStatus === Status.Loading;
  //   } else if(formData.rating < 4) {
  //     return formData.negative.length <= minCharacters || formData.rating === 0 || formData.negative.length >= maxCharacters || postStatus === Status.Loading;
  //   }
  // };

  //  РАБОЧАЯ ВАЛИДАЦИЯ ДЛЯ ВАШЕГО СЕРВЕРА
  const disabled = () => formData.negative.length <= minCharacters ||
    formData.positive.length <= minCharacters || formData.rating === 0 ||
    formData.negative.length >= maxCharacters || formData.positive.length >= maxCharacters ||
    postStatus === Status.Loading;

  useEffect(() => {
    if (postStatus === Status.Success && formData.rating !== 0) {
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
                      {(formData.positive && formData.positive.length < minCharacters + 1) && <b> Недостатки - Осталось символов: {minCharacters + 1 - formData.positive.length}</b>}
                      {(formData.positive && formData.positive.length >= maxCharacters) && <b > Максимально {maxCharacters} Символов </b>}
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
                      {(formData.negative && formData.negative.length < minCharacters + 1) && <b> Недостатки - Осталось символов: {minCharacters + 1 - formData.negative.length}</b>}
                      {(formData.negative && formData.negative.length >= maxCharacters) && <b > Максимально {maxCharacters} Символов </b>}
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
                  Для отправки ревью необходимо поставить <b> рейтинг </b> и заполнить оба поля <b>{minCharacters} символами</b>.
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
