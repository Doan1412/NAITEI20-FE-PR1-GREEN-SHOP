import { FilterParams } from "../types/filterParams.type";

export const buildQueryString = (filters: FilterParams = {}): string => {
  const queryParams: string[] = [];

  if (filters.category) {
    queryParams.push(`category.lv0=${encodeURIComponent(filters.category)}`);
  }

  if (filters.subcategory) {
    queryParams.push(`category.lv1=${encodeURIComponent(filters.subcategory)}`);
  }

  if (filters.price) {
    if (filters.price.min !== undefined) {
      queryParams.push(`price_gte=${filters.price.min}`);
    }
    if (filters.price.max !== undefined) {
      queryParams.push(`price_lte=${filters.price.max}`);
    }
  }

  if (filters.color) {
    queryParams.push(`color=${encodeURIComponent(filters.color)}`);
  }

  return queryParams.join("&");
};
