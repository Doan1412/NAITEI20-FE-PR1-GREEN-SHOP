import { useEffect, useState } from "react";
import { IoMdArrowDropright , IoMdArrowDropdown } from "react-icons/io";
import { useFilterContext } from "../contexts/FilterContext";
import { FilterParams } from "../types/filterParams.type";

const priceRanges = [
  { label: "200.000 Đ - 400.000 Đ", min: 200000, max: 400000 },
  { label: "400.000 Đ - 600.000 Đ", min: 400000, max: 600000 },
  { label: "600.000 Đ - 800.000 Đ", min: 600000, max: 800000 },
  { label: "800.000 Đ - 1.000.000 Đ", min: 800000, max: 1000000 },
  { label: "1.000.000 Đ - 2.000.000 Đ", min: 1000000, max: 2000000 },
];
const FilterPrice = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const { filters, setFilters } = useFilterContext();


  useEffect(() => {
    if (filters.price) {
      const selectedRange = priceRanges.find(range => range.min === filters.price?.min && range.max === filters.price?.max);
      setSelectedPriceRange(selectedRange ? selectedRange.label : null);
    }
  }, [filters]);

  const handlePriceRangeClick = (priceRange: { label: string; min: number; max: number }) => {
    setFilters((prevParams) => {
      const newParams: FilterParams = { ...prevParams };

      if (
        selectedPriceRange === priceRange.label
      ) {
        delete newParams.price;
      } else {
        newParams.price = { min: priceRange.min, max: priceRange.max };
      }

      return newParams;
    });

    setSelectedPriceRange(
      selectedPriceRange === priceRange.label ? null : priceRange.label
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-green-500 mb-3 underline underline-offset-[16px] decoration-4">
        Tìm theo giá
      </h3>
      <hr />
      <ul className="mt-2">
        {priceRanges.map((priceRange) => (
          <li key={priceRange.label}>
            <div
              className={`flex items-center gap-2 pt-3 cursor-pointer ${
                selectedPriceRange === priceRange.label ? "font-bold text-green-500" : "text-gray-500"
              }`}
              onClick={() => handlePriceRangeClick(priceRange)}
            >
              {selectedPriceRange === priceRange.label ? (
                <IoMdArrowDropdown className="text-sm text-gray-500" />
              ) : (
                <IoMdArrowDropright  className="text-sm text-gray-500" />
              )}
              <span className="text-sm">{priceRange.label}</span>
            </div>
            <hr className="mt-3"/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPrice;
