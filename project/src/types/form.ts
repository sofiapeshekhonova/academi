type Props = {
  value: string;
  error: string;
  regex: RegExp;
  isValid: boolean;
  hasValue: boolean;
  text?: File | null;
}

export type FormProps = {
  [key: string]: Props;
}
