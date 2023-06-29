import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthData } from '../../types/auth-data';

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

  const [formValue, setFormValue] = useState<FormProps>({
    email: {
      value: '',
      isValid: false,
      error: 'Please enter a valid email address',
      regex: /[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/,
      hasValue: false,
    },
    password: {
      value: '',
      isValid: false,
      error: 'At least one letter and number',
      regex: /\d+[a-zA-Z]+|[a-zA-Z]+\d+/,
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
    // dispatch(loginAction(authData));
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      login: formValue.email.value,
      password: formValue.password.value
    });
  }
  return (
    <form action="#" method="post" autoComplete="off" onSubmit={handleSubmit}>
      <div className="login-page__fields">
        <div className="custom-input login-page__field">
          <label>
            <span className="custom-input__label">Введите вашу почту</span>
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
            <span className="custom-input__label">Введите ваш пароль</span>
            <input type="password" name="password"
              placeholder="Пароль" required
              minLength={2}
              onChange={handleChange}
              value={formValue.password.value || ''}
            />
          </label>
        </div>
      </div>
      <button className="btn login-page__btn btn--large" type="submit">Войти</button>
    </form>
  );
}

export default LoginForm;
