import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { AuthDataRegister } from '../../types/auth-data';
import { registrationAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRegisterStatus } from '../../store/user/selectors';
import { EMAIL_ERROR_TEXT, EMAIL_REGEX, IMG_ERROR_TEXT, IMG_REGEX, NAME_ERROR_TEXT, NAME_REGEX, PASSWORD_ERROR_TEXT, PASSWORD_REGEX, Status } from '../../constants';
import { FormProps } from '../../types/form';

function RegisterForm() {
  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector(getRegisterStatus);
  const [, setAvatarMistake] = useState('');

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
    name: {
      value: '',
      isValid: false,
      error: NAME_ERROR_TEXT,
      regex: NAME_REGEX,
      hasValue: false,
    },
    file: {
      value: '',
      text: null,
      isValid: false,
      error: IMG_ERROR_TEXT,
      regex: IMG_REGEX,
      hasValue: false,
    },
  });

  function validateFile(image: Blob) {
    return new Promise((mistake) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        if (img.height > 100 || img.width > 100) {
          mistake('Ошибка');
        }
      };
    });
  }

  const validateCallback = useCallback(async (file: Blob) => {
    const fileError = await validateFile(file);
    if(fileError === 'Ошибка') {
      setAvatarMistake('Ошибка');
    }
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    let isValid = formValue[name].regex.test(value);
    const hasValue = !!value.trim();

    if (e.target.files) {
      if (name === 'file') {
        validateCallback(e.target.files[0]);
        isValid = formValue[name].regex.test(value) && e.target.files[0]['size'] < 100000;
        setFormValue({
          ...formValue,
          [name]: { ...formValue[name], value, isValid, hasValue, text: e.target.files[0] },
        });
      }

    } else {
      setFormValue({
        ...formValue,
        [name]: { ...formValue[name], value, isValid, hasValue },
      });
    }
  }
  const onSubmit = (authData: AuthDataRegister) => {
    dispatch(registrationAction(authData));
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValue.file.text) {
      onSubmit({
        email: formValue.email.value,
        password: formValue.password.value,
        name: formValue.name.value,
        avatar: formValue.file.text
      });
    } else {
      onSubmit({
        email: formValue.email.value,
        password: formValue.password.value,
        name: formValue.name.value,
      });
    }
  }

  const errorEmail = !formValue.email.isValid && formValue.email.hasValue;
  const errorName = !formValue.name.isValid && formValue.name.hasValue;
  const errorPassword = !formValue.password.isValid && formValue.password.hasValue;
  const errorFile = !formValue.file.isValid && formValue.file.hasValue;

  return (
    <form action="#" method="post" autoComplete="off" onSubmit={handleSubmit} noValidate>
      <p style={{ color: 'red' }}>{registerStatus === Status.Failed && 'Что-то пошло не так'}</p>
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
              {errorEmail ? formValue.email.error : EMAIL_ERROR_TEXT}
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
              {errorPassword ? formValue.password.error : PASSWORD_ERROR_TEXT}
            </span>
            <input type="password" name="password"
              placeholder="Пароль" required
              minLength={2}
              onChange={handleChange}
              value={formValue.password.value || ''}
            />
          </label>
        </div>
        <div className={`custom-input ${formValue.file.value && 'file-selected'}`}>
          <span className={`${errorFile ? 'custom-input__message' : 'custom-input__label'}`} style={{ paddingRight: '30px' }}>
            {errorFile ? formValue.file.error : IMG_ERROR_TEXT}
          </span>
          <label>
            <span className="custom-input__label">Загрузите аватар</span>
            <input type="file" name="file" value={formValue.file.value} data-text="Аватар" accept="image/jpeg" onChange={handleChange} />
          </label>
        </div>
      </div>
      <button className="btn register-page__btn btn--large" type="submit"
        disabled={!(formValue.email.isValid && formValue.password.isValid && formValue.name.isValid && !errorFile)
          || registerStatus === Status.Loading }
      >
        {registerStatus === Status.Loading ? 'Загрузка..' : 'Зарегистрироваться'}
      </button>

    </form>
  );
}

export default RegisterForm;
