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
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductsMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductsMutation();

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
    { name: "price", label: "Цена", type: "number" },
    { name: "weight", label: "Вес", type: "number" },
    { name: "active", label: "Активный", type: "checkbox" },
    {
      name: "created_at",
      label: "Дата создания",
      type: "text",
      editable: false,
    },
    {
      name: "updated_at",
      label: "Дата обновления",
      type: "text",
      editable: false,
    },
  ];

  const renderImages = () => {
    const images = [];
    if (data?.data?.image) images.push(data.data.image);

    return images.length ? <ImageSlider images={images} /> : null;
  };

  if (isLoading || categoryLoading) return <Loading />;
  return (
    <>
      {updateLoading || (deleteLoading && <Loading />)}
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
          <CategorySelect
            categoryData={categoryData}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          <Discount discount={discount} handleDiscount={handleDiscount} />
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
