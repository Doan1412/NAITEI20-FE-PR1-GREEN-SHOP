import { useState, useEffect } from "react";
import { Category } from "../types/category.type";
import { IoMdArrowDropright , IoMdArrowDropdown } from "react-icons/io";
import { FilterParams } from "../types/filterParams.type";
import { useSetSearchParams } from "../hooks/useSetSearchParams";
import { useFilterContext } from "../contexts/FilterContext";
import { fetchCategories } from "../api/categoryApi";

const FilterCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const { filters, setFilters } = useFilterContext();
  useSetSearchParams(filters);

  useEffect(() => {
    const loadCategories = async () => {
      const categoryList = await fetchCategories();
      setCategories(categoryList.sort((a, b) => a.name.localeCompare(b.name)));
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (filters.category) {
      setExpandedCategory(filters.category);
    } else {
      setExpandedCategory(null);
    }

    if (filters.subcategory) {
      setExpandedSubcategory(filters.subcategory);
    } else {
      setExpandedSubcategory(null);
    }
  }, [filters]);

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prevParams) => {
      const newParams: FilterParams = { ...prevParams };
      delete newParams.subcategory;
      delete newParams.page;

      if (expandedCategory === categoryName) {
        delete newParams.category;
      } else {
        newParams.category = categoryName;
      }

      return newParams;
    });

    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    setFilters((prevParams) => {
      const newParams: FilterParams = { ...prevParams };

      if (expandedSubcategory === subcategoryName) {
        delete newParams.subcategory;
      } else {
        newParams.subcategory = subcategoryName;
      }

      return newParams;
    });

    setExpandedSubcategory(expandedSubcategory === subcategoryName ? null : subcategoryName);
  };

  return (
    <div className="mb-8">
      <h3 className="xl font-semibold text-green-500 mb-3 underline underline-offset-[16px] decoration-4">Danh mục sản phẩm</h3>
      <hr />
      <ul className="mt-2">
        {categories.map((category) => (
          <li key={category.name}>
            <div
              className={`flex items-center gap-2 pt-3 cursor-pointer ${
                expandedCategory === category.name ? "font-bold text-green-500" : "text-gray-500"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {expandedCategory === category.name ? (
                <IoMdArrowDropdown className="text-sm text-gray-500" />
              ) : (
                <IoMdArrowDropright  className="text-sm text-gray-500" />
              )}
              <span className="text-sm">{category.name}</span>
              <span className="bg-gray-100 text-[10px] font-bold text-gray-600 px-2 rounded-md">
                {category.total}
              </span>
            </div>

            {expandedCategory === category.name && (
              <ul className="ml-4 mt-2">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.name}>
                    <div
                      className={`flex items-center gap-2 mt-3 cursor-pointer ${
                        expandedSubcategory === subcategory.name
                          ? "font-bold text-green-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleSubcategoryClick(subcategory.name)}
                    >
                      {expandedSubcategory === subcategory.name ? (
                        <IoMdArrowDropdown className="text-xs text-gray-500" />
                      ) : (
                        <IoMdArrowDropright  className="text-xs text-gray-500" />
                      )}
                      <span className="text-sm">{subcategory.name}</span>
                      <span className="bg-gray-100 text-[10px] font-bold text-gray-600 px-2 rounded-md">
                        {subcategory.total}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          <hr className="mt-3"/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategory;
