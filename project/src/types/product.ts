export type Product = {
  id: string;
  title: string;
  category: string;
  type: string;
  price: number;
  previewImage: string;
  previewImageWebp: string;
  isFavorite: boolean;
  isNew: boolean;
 }

export type ActiveProduct = {
    id: string;
    title: string;
    category: string;
    type: string;
    price: number;
    previewImage: string;
    previewImageWebp: string;
    isFavorite: boolean;
    isNew: boolean;
    description: string;
    images: string[];
    weight: number;
    rating: number;
    reviewCount: number;
 }

export type FavoritesProducts = {
  productId: string;
}
