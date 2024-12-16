import FilterCategory from "./FilterCategory";
import FilterColor from "./FilterColor";
import FilterPrice from "./FilterPrice";

const FilterBar = () => {
  return (
    <div className="w-[90%] bg-white px-4">
      <FilterCategory />
      <FilterPrice />
      <FilterColor />
    </div>
  );
};

export default FilterBar;
