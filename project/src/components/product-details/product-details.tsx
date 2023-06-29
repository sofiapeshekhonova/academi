import { useEffect, useState } from 'react';
import { STARS } from '../../constants';
import { ActiveProduct } from '../../types/product';
import Rating from '../rating/rating';

type PropsType = {
  product: ActiveProduct;
}

function ProductDetails({ product }: PropsType) {
  const [length, setLength] = useState(140);
  const [description, setDescription] = useState(product.description);

  useEffect(()=> {
    setDescription(product.description.slice(0, length));
  }, [length, product.description]);

  function handleMoreDescroptionButton() {
    setLength(product.description.length);
  }

  return (
    // если нет коментариев или информация по кексам не найдена
    // <section className="item-details">
    <section className="item-details item-details--form-open" >
      <div className="container">
        <div className="item-details__wrapper">
          <div className="item-details__top-wrapper">
            <h2 className="item-details__name">{product.title}</h2>
            <span className="item-details__price">{product.price} р</span>
          </div>
          <div className="item-details__weight-wrapper">
            <span className="item-details__weight">{product.weight} грамм</span>
          </div>
          <div className="item-details__bottom-wrapper">
            <div className="item-details__image-wrapper">
              <picture>
                <source type="image/webp" srcSet={product.previewImageWebp} />
                <img src={product.previewImageWebp} srcSet={product.previewImageWebp} width="241" height="245" alt={product.title} />
              </picture>
              {product.isNew ? <span className="item-details__label">Новинка</span> : ''}
            </div>
            <div className="item-details__review-wrapper">
              <div className="star-rating star-rating--big">
                {STARS.map((star) => (
                  <Rating key={star.id} rating={product.rating} star={star.rating} starId={star.id}/>
                ))}
                <span className="star-rating__count">{product.reviewCount}</span>
              </div>
              <div className="item-details__text-wrapper">
                <span className="item-details__text">{description}</span>
                {}
                {product.description.length > 140 && product.description.length !== length &&
                  <button className="item-details__more" onClick={handleMoreDescroptionButton}>
                    <span className="visually-hidden">Читать полностью</span>
                    <svg width="27" height="17" aria-hidden="true">
                      <use xlinkHref="#icon-more"></use>
                    </svg>
                  </button> }
              </div>
              <div className="item-details__button-wrapper">
                <button className="item-details__like-button">
                  <svg width="45" height="37" aria-hidden="true">
                    <use xlinkHref="#icon-like"></use>
                  </svg><span className="visually-hidden">Понравилось</span>
                </button>
                <button className="btn btn--second" type="button">Отменить отзыв</button>
                {/* <button class="btn btn--second" type="button">Оставить отзыв</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductDetails;
