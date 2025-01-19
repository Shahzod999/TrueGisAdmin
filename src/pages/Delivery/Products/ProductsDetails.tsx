import { useNavigate, useParams } from "react-router-dom";

import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import ImageSlider from "../../../components/ImageSlider";
import { Box } from "@mui/material";
import {
  useDeleteProductsMutation,
  useGetAllCategoryQuery,
  useGetSingleProductsQuery,
  useUpdateProductsMutation,
} from "../../../app/api/deliverySlice";
import { useEffect, useState } from "react";
import { CategoryType } from "../../../app/types/productsTypes";
import CategorySelect from "../../../components/CategorySelect/CategorySelect";
import Discount from "../../../components/Discount/Discount";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetSingleProductsQuery({ id });
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({
      page: 1,
    });
  const [updateProduct] = useUpdateProductsMutation();
  const [deleteProduct] = useDeleteProductsMutation();

  const [discount, setDiscount] = useState({
    price: data?.data?.discount?.price,
    start_date: data?.data?.discount?.start_date,
    end_date: data?.data?.discount?.end_date,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (data?.data?.category_id && categoryData?.data) {
      const category = categoryData.data.find(
        (item: CategoryType) => item._id === data.data.category_id,
      );
      setSelectedCategory(category?._id || "");
    }
  }, [data, categoryData]);

  const fetchData = async () => {
    if (!data) throw new Error("Данные отсутствуют");
    return data?.data;
  };

  const updateOneData = async (
    id: string,
    updatedData: Record<string, any>,
  ) => {
    await updateProduct({
      id,
      data: {
        ...data?.data,
        ...updatedData,
        category_id: selectedCategory,
        ...(discount?.price ? { discount } : {}),
      },
    }).unwrap();
    console.log({
      ...data?.data,
      ...updatedData,
      category_id: selectedCategory,
      ...(discount?.price ? { discount } : {}),
    });
  };

  const deleteData = async (id: string) => {
    await deleteProduct({ id });

    navigate(-1); // Перенаправление после удаления
  };

  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscount({ ...discount, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const fields = [
    { name: "name", label: "Название" },
    { name: "description", label: "Описание" },
    { name: "price", label: "Цена" },
    { name: "weight", label: "Вес" },
    { name: "active", label: "Активный", type: "checkbox" },
    { name: "created_at", label: "Дата создания" },
    { name: "updated_at", label: "Дата обновления" },
  ];

  const renderImages = () => {
    const images = [];
    if (data?.data?.image) images.push(data.data.image);

    return images.length ? <ImageSlider images={images} /> : null;
  };

  if (isLoading || categoryLoading) return <Loading />;
  return (
    <>
      {renderImages()}
      <Box
        display="flex"
        gap={4}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={"80%"}
        margin={"0 auto"}>
        <UniversalDetails
          title="Детали продукта"
          id={id || ""}
          fetchData={fetchData}
          updateData={updateOneData}
          deleteData={deleteData}
          fields={fields}
        />
        <Box>
          <Discount discount={discount} handleDiscount={handleDiscount} />
          {/* <Typography variant="h6" sx={{ marginBottom: 3 }}>
            Скидка
          </Typography>
          <TextField
            name="price"
            label="Цена со скидкой"
            fullWidth
            value={discount.price || ""}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 3 }}
            onChange={handleDiscount}
          />
          <TextField
            name="start_date"
            label="Дата начала скидки"
            type="date"
            fullWidth
            value={discount.start_date || ""}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 3 }}
            onChange={handleDiscount}
          />
          <TextField
            name="end_date"
            label="Дата окончания скидки"
            type="date"
            fullWidth
            value={discount.end_date || ""}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 3 }}
            onChange={handleDiscount}
          /> */}

          <CategorySelect
            categoryData={categoryData}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          {/* <Typography variant="h6" sx={{ marginBottom: 3 }}>
            Категория
          </Typography>
          <TextField
            select
            label="Категория"
            fullWidth
            value={selectedCategory}
            onChange={handleCategoryChange}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 3 }}>
            {categoryData?.data?.map((category: CategoryType) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField> */}
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
