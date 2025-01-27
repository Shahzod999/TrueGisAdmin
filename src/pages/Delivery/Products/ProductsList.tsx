import { useState } from "react";
import { Box, Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  useGetAllCategoryQuery,
  useGetAllProductsQuery,
} from "../../../app/api/deliverySlice";
import { useParams } from "react-router";
import CategoryButtons from "./CategoryButtons";
import Loading from "../../../components/Loading";
import ProductCards from "./ProductCards";

const GetAllProducts = () => {
  const { companyId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({ company_id: companyId }, { skip: !companyId });

  const { data, isLoading, isFetching } = useGetAllProductsQuery(
    {
      page: currentPage.toString(),
      limit: "15",
      category_id: selectedCategory,
      company_id: companyId,
    },
    { skip: !companyId },
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };
  const handleCategorySelect = (categoryId: string) => {
    console.log("Выбранная категория ID:", categoryId);
    setSelectedCategory(categoryId);
  };

  if (isLoading) return <Loading />;
  return (
    <div>
      {isFetching && <Loading />}

      {categoryLoading ? (
        <Loading />
      ) : (
        <CategoryButtons
          categories={categoryData?.data}
          onSelect={handleCategorySelect}
        />
      )}

      {/* <Box>Продукт есть или нет если нет дать возможности добавить</Box> */}

      <ProductCards products={data?.data || []} />

      <Box display="flex" justifyContent="center" mt={2}>
        <Stack spacing={2}>
          <Pagination
            count={data?.pagination?.totalPages || 1}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default GetAllProducts;
