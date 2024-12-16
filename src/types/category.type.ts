export interface Category {
  name: string;
  total: number;
  subcategories: Category[];
};
