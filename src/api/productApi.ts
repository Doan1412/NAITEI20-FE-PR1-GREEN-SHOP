import { FilterParams } from "../types/filterParams.type";
import { Product } from "../types/product.type";
import { applyFilters } from "../utils/filters";
import http from "../utils/http";
import { buildQueryString } from '../utils/queryUtils';

export const fetchProducts = async (filters: FilterParams = {}): Promise<Product[]> => {
  try {
    const queryString = buildQueryString(filters);
    
    const response = await http.get(`/products?${queryString}`);
    const products = applyFilters(response.data, filters);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
