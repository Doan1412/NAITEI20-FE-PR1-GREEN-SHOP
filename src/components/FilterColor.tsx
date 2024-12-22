import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";
import { FilterParams } from "../types/filterParams.type";

const FilterColor = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { filters, setFilters } = useFilterContext();

  const colorOptions = [
    { label: "Xanh cây", color: "green" },
    { label: "Đỏ cam", color: "orange" },
    { label: "Tím", color: "purple" },
    { label: "Xanh trời", color: "blue" },
    { label: "Vàng", color: "yellow" },
    { label: "Hồng", color: "pink" },
  ];

  useEffect(() => {
    if (filters.color) {
      setSelectedColor(filters.color);
    } else {
      setSelectedColor(null);
    }
  }, [filters]);

  const handleColorClick = (color: string) => {
    setFilters((prevParams) => {
      const newParams: FilterParams = { ...prevParams };

      if (selectedColor === color) {
        delete newParams.color;
      } else {
        newParams.color = color;
      }

      return newParams;
    });

    setSelectedColor(selectedColor === color ? null : color);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-green-500 mb-3 underline underline-offset-[16px] decoration-4">
        Tìm theo màu
      </h3>
      <hr />
      <div className="grid grid-cols-2 gap-4 mt-5">
        {colorOptions.map((option) => (
          <div
            key={option.color}
            className={`flex items-center gap-2 cursor-pointer mt-5 ${
              selectedColor === option.color ? "font-bold text-green-500" : ""
            }`}
            onClick={() => handleColorClick(option.label)}
          >
            <span
              className={`w-5 h-5 rounded-full`}
              style={{ backgroundColor: option.color }}
            />
            <span
              className={`text-sm ${
                selectedColor === option.label ? "font-bold text-green-500" : ""
              }`}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterColor;
