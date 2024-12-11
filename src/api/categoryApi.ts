import http from "../utils/http";
import { Category } from "../types/category.type";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await http.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
