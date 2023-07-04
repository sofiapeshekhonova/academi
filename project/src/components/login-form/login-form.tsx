import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { EMAIL_ERROR_TEXT, EMAIL_REGEX, PASSWORD_ERROR_TEXT, PASSWORD_REGEX, Status } from '../../constants';
import { getStatus } from '../../store/user/selectors';

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

function LoginForm() {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(getStatus);
  const [formValue, setFormValue] = useState<FormProps>({
    email: {
      value: '',
      isValid: false,
      error: EMAIL_ERROR_TEXT,
      regex: EMAIL_REGEX,
      hasValue: false,
    },
    password: {
      value: '',
      isValid: false,
      error: PASSWORD_ERROR_TEXT,
      regex: PASSWORD_REGEX,
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

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      email: formValue.email.value,
      password: formValue.password.value
    });
  }

  const error = !formValue.email.isValid && formValue.email.hasValue;
  const errorPassword = !formValue.password.isValid && formValue.password.hasValue;
  return (
    <form action="#" method="post" autoComplete="off" onSubmit={handleSubmit} noValidate>
      <p style={{ color: 'red' }}>{loginStatus === Status.Failed && 'Что-то пошло не так'}</p>
      <div className="login-page__fields">
        <div className="custom-input login-page__field">
          <label>
            <span className={`${error ? 'custom-input__message' : 'custom-input__label'}`} style={{ paddingRight: '30px' }}>
              {error ? formValue.email.error : EMAIL_ERROR_TEXT}
            </span>
            <input
              type="email" name="email"
              placeholder="Почта" required
              minLength={1} onChange={handleChange}
              value={formValue.email.value || ''}
            />
          </label>
        </div>
        <div className="custom-input login-page__field">
          <label>
            <span className={`${errorPassword ? 'custom-input__message' : 'custom-input__label'}`} style={{ paddingRight: '40px' }}>
              {!errorPassword ? formValue.password.error : PASSWORD_ERROR_TEXT}
            </span>
            <input type="password" name="password"
              placeholder="Пароль" required
              minLength={2}
              onChange={handleChange}
              value={formValue.password.value || ''}
            />
          </label>
        </div>
      </div>
      <button className="btn login-page__btn btn--large" type="submit"
        disabled={!(formValue.email.isValid && formValue.password.isValid)
          || loginStatus === Status.Loading || loginStatus === Status.Failed}
      >
        {loginStatus === Status.Loading ? 'Загрузка..' : 'Войти'}
      </button>
    </form>
  );
}

export default LoginForm;
