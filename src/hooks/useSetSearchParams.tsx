import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterParams } from "../types/filterParams.type";

export const useSetSearchParams = (filterParams: FilterParams) => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (filterParams.category) {
      newParams.set("category", filterParams.category);
    }

    if (filterParams.subcategory) {
      newParams.set("subcategory", filterParams.subcategory);
    }

    if (filterParams.price) {
      if (filterParams.price.min !== undefined) {
        newParams.set("price_min", filterParams.price.min.toString());
      }
      if (filterParams.price.max !== undefined) {
        newParams.set("price_max", filterParams.price.max.toString());
      }
    }

    if (filterParams.color) {
      newParams.set("color", filterParams.color);
    }

    if (filterParams.viewType) {
      newParams.set("view_type", filterParams.viewType);
    }

    if (filterParams.sortOrder !== undefined) {
      newParams.set("sortOrder", filterParams.sortOrder);
    }

    if (filterParams.perPage !== undefined) {
      newParams.set("perPage", filterParams.perPage.toString());
    }

    if (filterParams.page !== undefined) {
      newParams.set("page", filterParams.page.toString());
    }

    if (filterParams.query) {
      newParams.set("query", filterParams.query);
    }

    setSearchParams(newParams);
  }, [filterParams, setSearchParams]);
};
