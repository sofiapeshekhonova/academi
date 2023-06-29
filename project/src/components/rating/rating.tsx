type PropsType ={
  star: number;
  rating: number;
  starId: number;
}

function Rating({rating, starId, star}: PropsType) {
  const className = rating - 1 >= star ? 'star-rating__star star-rating__star--active' : 'star-rating__star';
  return (
    // star-rating__star--active
    <svg className={className} width="30" height="30" aria-hidden="true">
      <use xlinkHref="#icon-star"></use>
    </svg>
  );
}

export default Rating;
