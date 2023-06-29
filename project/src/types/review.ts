export type ReviewsType = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  positive: string;
  isoDate: string;
  negative: string;
  rating: number;
}

