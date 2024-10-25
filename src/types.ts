export interface Product {
  _id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  productId: string;
  description: string;
  date: string;
}

export type SortOption = 'alphabetical' | 'count';