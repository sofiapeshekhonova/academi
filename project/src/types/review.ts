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

export type CommentType = {
  rating: number;
  positive: string;
  negative : string;
  id: string;
}

export type ReviewsPostType = {
  id: string;
  positive: string;
  negative: string;
  rating: number;
}
