import { Status } from '../../constants';

type StarsInputProps = {
  name: string;
  starId: number;
  value: number;
  postStatus: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function StarsInput({ onChange, starId, name, value, postStatus }: StarsInputProps) {
  return (
    <>
      <input
        id={`input-star-rating-${starId}`}
        type="radio"
        name="rating"
        value={starId}
        aria-label={`${name} звезд`}
        onChange={onChange}
        checked={starId === Number(value)}
        disabled={postStatus === Status.Loading}
      />
      <label htmlFor={`input-star-rating-${starId}`}>
        <svg width="40" height="40" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default StarsInput;
