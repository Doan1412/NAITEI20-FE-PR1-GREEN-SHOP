export interface FilterParams {
  category?: string;
  subcategory?: string;
  price?: {
    min?: number;
    max?: number;
  };
  color?: string;
  viewType?: string;
  sortOrder?: string;
  perPage?: number;
  page?: number;
  query?: string;
};
