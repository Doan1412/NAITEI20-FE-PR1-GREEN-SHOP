import { useEffect, useState } from "react";
import { Product } from "../../types/product.type";
import { FilterParams } from "../../types/filterParams.type";
import { useFilterParams } from "../../hooks/useFilterParams";
import FilterBar from "../../components/FilterBar";
import { Breadcrumb, Button, Pagination } from "antd";
import ProductItem from "../../components/ProductItem";
import SortBar from "../../components/SortBar";
import { fetchProducts } from "../../api/productApi";
import Banner from "../../assets/images/list_product_banner.jpg";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import NoItems from "../../assets/images/noitems.png"
import { useFilterContext } from "../../contexts/FilterContext";
const ProductList = () => {
  const filters = useFilterParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [prevFilters, setPrevFilters] = useState<FilterParams>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const { clearFilters } = useFilterContext();

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(prevFilters)) {
      const fetchFilteredProducts = async () => {
        const fetchedProducts = await fetchProducts(filters);
        setProducts(fetchedProducts);
      };

      fetchFilteredProducts();
      setItemsPerPage(filters.perPage || 9);
      setCurrentPage(filters.page || 1);
      setPrevFilters(filters);
    }
  }, [filters, prevFilters]);

  const totalItems = products.length;
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-8 w-[75%] mx-auto">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <div className="text-green-600">Danh sách sản phẩm</div>,
            },
          ]}
        />
      </div>
      <div className="flex mx-auto py-[16px] w-[78%] bg-[fbf9f9]">
        <div className="w-1/4">
          <FilterBar />
        </div>

        <div className="w-3/4">
          <img src={Banner} alt="Banner" className="h-36 object-cover w-full" />
          <SortBar />
          <hr />
          {displayedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center my-20">
              <img
                src={NoItems}
                alt="No products found"
                className="w-64 h-64 mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Không tìm thấy sản phẩm nào
              </h2>
              <p className="text-gray-500 mb-6">
                Chúng tôi rất tiếc, không có sản phẩm phù hợp với tiêu chí của
                bạn. Hãy thử tìm kiếm lại hoặc thay đổi bộ lọc.
              </p>
              <Button className="w-32 h-10" onClick={clearFilters}>
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <>
              <div
                className={`grid ${
                  filters.viewType === "grid"
                    ? "grid-cols-3 gap-4"
                    : "grid-cols-1 gap-4"
                } my-8`}
              >
                {displayedProducts.map((product) =>
                  filters.viewType === "grid" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <ProductItem key={product.id} product={product} />
                  )
                )}
              </div>
              <div className="flex justify-center w-full mb-20">
                <Pagination
                  current={currentPage}
                  total={totalItems}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
