import { useSearchParams } from "react-router-dom";
import { FilterParams } from "../types/filterParams.type";

export const useFilterParams = (): FilterParams => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;
  const priceMin = searchParams.has("price_min") ? parseFloat(searchParams.get("price_min")!) : undefined;
  const priceMax = searchParams.has("price_max") ? parseFloat(searchParams.get("price_max")!) : undefined;
  const color = searchParams.get("color") || undefined;
  const viewType = searchParams.get("view_type") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;
  const perPage = searchParams.has("perPage") ? parseInt(searchParams.get("perPage")!) : undefined;
  const page = searchParams.has("page") ? parseInt(searchParams.get("page")!) : undefined;
  const query = searchParams.get("query") || undefined;

  const filters: FilterParams = {
    category,
    subcategory,
    price: (priceMin || priceMax) ? { min: priceMin, max: priceMax } : undefined,
    color,
    viewType,
    sortOrder,
    perPage,
    page,
    query
  };

  return filters;
};
