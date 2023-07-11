export type UserData = {
  id: number;
  email: string;
  token: string;
  name: string;
  avatar?: File;
  avatarUrl?: string;
}

export type UserAvatar = {
  token: string;
  avatar?: File;
  avatarUrl?: string;
}
