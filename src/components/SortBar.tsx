import React, { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";
import { FaList } from "react-icons/fa6";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const SortBar = () => {
  const { filters, setFilters } = useFilterContext();
  const [sortOption, setSortOption] = useState("featured");
  const [hitsPerPage, setHitsPerPage] = useState(9);
  const [viewType, setViewType] = useState(filters.viewType || "list");

  const sortOptions = [
    { value: "featured", label: "Sắp xếp theo đặc trưng" },
    { value: "price_asc", label: "Giá tăng" },
    { value: "price_desc", label: "Giá giảm" },
    { value: "name_asc", label: "Tên A-Z" },
    { value: "name_desc", label: "Tên Z-A" },
  ];

  const hitsOptions = [9, 12, 18];

  useEffect(() => {
    if (filters.sortOrder) {
      setSortOption(filters.sortOrder);
    }

    if (filters.perPage) {
      setHitsPerPage(filters.perPage);
    }

    if (filters.viewType) {
      setViewType(filters.viewType);
    }
  }, [filters]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    delete filters.page;
    if (newSortOption !== "featured") {
      setFilters({ ...filters, sortOrder: newSortOption });
    } else {
      delete filters.sortOrder;
      setFilters(filters);
    }
  };

  const handleHitsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHitsPerPage = Number(e.target.value);
    setHitsPerPage(newHitsPerPage);

    const updatedFilters = { ...filters };
    delete updatedFilters.page;
  
    if (newHitsPerPage !== 9) {
      updatedFilters.perPage = newHitsPerPage;
    } else {
      delete updatedFilters.perPage;
    }
  
    setFilters(updatedFilters);
  };

  const handleViewTypeChange = (type: string) => {
    setViewType(type);
    setFilters({ ...filters, viewType: type });
  };

  return (
    <div className="flex gap-3 justify-between items-center mt-5 mb-5 text-[12px] text-gray-700">
      <div className="flex gap-5">
        <FaList
          className={`cursor-pointer ${viewType === "list" ? "text-green-500" : ""}`}
          size={20}
          onClick={() => handleViewTypeChange("list")}
        />
        <BsFillGrid3X3GapFill
          className={`cursor-pointer ${viewType === "grid" ? "text-green-500" : ""}`}
          size={20}
          onClick={() => handleViewTypeChange("grid")}
        />
      </div>
      <div className="flex">
        <div className="relative">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="rounded px-3 py-2"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            value={hitsPerPage}
            onChange={handleHitsPerPageChange}
            className="rounded px-3 py-2"
          >
            {hitsOptions.map((option) => (
              <option key={option} value={option}>
                {option} hits per page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
