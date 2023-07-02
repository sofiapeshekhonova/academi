import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthDataRegister } from '../../types/auth-data';
import { registrationAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRegisterStatus } from '../../store/user/selectors';
import { Status } from '../../constants';

type Props = {
  value: string;
  error: string;
  regex: RegExp;
  isValid: boolean;
  hasValue: boolean;
}

type FormProps = {
  [key: string]: Props;
}

function RegisterForm() {
  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector(getRegisterStatus);
  const [formValue, setFormValue] = useState<FormProps>({
    email: {
      value: '',
      isValid: false,
      error: 'Введите валидную почту',
      regex: /[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/,
      hasValue: false,
    },
    password: {
      value: '',
      isValid: false,
      error: 'Пароль должен содержать одну буву и цифру',
      regex: /\d+[a-zA-Z]+|[a-zA-Z]+\d+/,
      hasValue: false,
    },
    name: {
      value: '',
      isValid: false,
      error: 'Должно быть больше 1 буквы',
      regex: /^.{1,20}$/,
      hasValue: false,
    },
    img: {
      value: '',
      isValid: false,
      error: 'Загрузите валидное изображение png|jpg',
      // Для загрузки доступно изображение не более 100 на 100 пикселей, размер менее 1 мб
      regex: /^[^?#]+\.(png|jpg|jpe?g)([?#].*)?$/i,
      //'~https?://[\S.]+(?:jpg|jpeg|png)\b~'
      hasValue: false,
    },
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const isValid = formValue[name].regex.test(value);
    const hasValue = !!value.trim();

    setFormValue({
      ...formValue,
      [name]: { ...formValue[name], value, isValid, hasValue },
    });
  }

  const onSubmit = (authData: AuthDataRegister) => {
    dispatch(registrationAction(authData));
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      email: formValue.email.value,
      password: formValue.password.value,
      name: formValue.name.value,
      img: formValue.img.value
    });
  }
  const errorEmail = !formValue.email.isValid && formValue.email.hasValue;
  const errorName = !formValue.name.isValid && formValue.name.hasValue;
  const errorPassword = !formValue.password.isValid && formValue.password.hasValue;
  //const errorEmail = !formValue.email.isValid && formValue.email.hasValue;
  return(
    <form action="#" method="post" autoComplete="off" onSubmit={handleSubmit}>
      <p style={{color: 'red'}}>{registerStatus === Status.Failed && 'Что-то пошло не так'}</p>
      <div className="register-page__fields">
        <div className="custom-input register-page__field">
          <label>
            <span className={`${errorName ? 'custom-input__message' : 'custom-input__label'}`} style={{ paddingRight: '30px' }}>
              {errorName ? formValue.name.error : 'Введите ваше имя'}
            </span>
            <input type="text" name="name"
              placeholder="Имя" required
              id="password"
              minLength={1}
              onChange={handleChange}
              value={formValue.name.value || ''}
            />
          </label>
        </div>
        <div className="custom-input register-page__field">
          <label>
            <span className={`${errorEmail ? 'custom-input__message' : 'custom-input__label'}`} style={{ paddingRight: '30px' }}>
              {errorEmail ? formValue.email.error : 'Введите вашу почту'}
            </span>
            <input
              type="email" name="email"
              placeholder="Почта" required
              minLength={1} onChange={handleChange}
              value={formValue.email.value || ''}
            />
          </label>
        </div>
        <div className="custom-input register-page__field">
          <label>
            <span className={`${errorPassword ? 'custom-input__message' : 'custom-input__label'}`} style={{ paddingRight: '30px' }}>
              {errorPassword ? formValue.password.error : 'Введите ваш пароль'}
            </span>
            <input type="password" name="password"
              placeholder="Пароль" required
              minLength={2}
              onChange={handleChange}
              value={formValue.password.value || ''}
            />
          </label>
        </div>
        <div className="custom-input register-page__field">
          <label>
            <span className="custom-input__label">Загрузите аватар</span>
            <input type="file"
              name="user-name-1"
              data-text="Аватар"
              accept="image/jpeg"
              onChange={handleChange}
              value={formValue.img.value || ''}
            />
          </label>
        </div>
      </div>
      <button className="btn register-page__btn btn--large" type="submit"
        disabled={!(formValue.email.isValid && formValue.password.isValid && formValue.name.isValid)
         || registerStatus === Status.Loading || registerStatus === Status.Failed}
      >
        {registerStatus === Status.Loading ? 'Загрузка..' : 'Зарегистрироваться'}
      </button>

    </form>
  );
}

export default RegisterForm;
