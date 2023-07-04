export type AuthData = {
  email: string;
  password: string;
};

export type AuthDataRegister = {
  email: string;
  password: string;
  name: string;
  avatar?: File;
};

export type AuthDataAvatar = {
  avatar: File;
};
