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

import Discount from "../../../components/Discount/Discount";
import DropDownSelect from "../../../components/DropDownSelect/DropDownSelect";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id, companyId } = useParams();

  const [currency, setCurrency] = useState<string>("");
  const [choosenCurrency, setChoosenCurrency] = useState<string>("");

  const { data, isLoading } = useGetSingleProductsQuery({ id });
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({
      page: 1,
      company_id: companyId,
    });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductsMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductsMutation();

  const variants = [
    { _id: "1", name: "USD" },
    { _id: "2", name: "EUR" },
    { _id: "3", name: "RUB" },
    { _id: "4", name: "UZS" },
    { _id: "5", name: "KZT" },
    { _id: "6", name: "KGS" },
  ];

  const [discount, setDiscount] = useState({
    price: data?.data?.discount?.price,
    start_date: data?.data?.discount?.start_date,
    end_date: data?.data?.discount?.end_date,
  });

  const fetchData = async () => {
    if (!data) throw new Error("Данные отсутствуют");
    return data?.data;
  };

  useEffect(() => {
    if (data?.data?.currency) {
      const foundVariant = variants.find(
        (item) => item.name === data.data.currency,
      );
      if (foundVariant) {
        setCurrency(foundVariant._id);
        setChoosenCurrency(foundVariant.name);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.category_id && categoryData?.data) {
      const category = categoryData.data.find(
        (item: CategoryType) => item._id === data.data.category_id,
      );
      setSelectedCategory(category?._id || "");
    }
  }, [data, categoryData]);

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
        currency: choosenCurrency,
        ...(discount?.price ? { discount } : {}),
      },
    }).unwrap();
    console.log({
      ...data?.data,
      ...updatedData,
      category_id: selectedCategory,
      currency: choosenCurrency,
      ...(discount?.price ? { discount } : {}),
    });
  };

  const deleteData = async (id: string) => {
    await deleteProduct({ id });
    navigate(-1);
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
  ];

  const renderImages = () => {
    const images = [];
    if (data?.data?.image) images.push(data.data.image);

    return images.length ? <ImageSlider images={images} /> : null;
  };

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    setCurrency(selectedId);

    // Находим вариант с таким ID и берём его название
    const newCurrency = variants.find((variant) => variant._id === selectedId);
    if (newCurrency) {
      setChoosenCurrency(newCurrency.name);
    }
  };

  if (isLoading || categoryLoading) return <Loading />;
  return (
    <>
      {updateLoading || (deleteLoading && <Loading />)}
      {renderImages()}
      <Box
        display="flex"
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
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={"space-between"}
          gap={3}
          p={2}
          sx={{
            width: "100%",
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
          }}>
          <Box sx={{ minWidth: "250px", flex: 1 }}>
            <DropDownSelect
              data={variants}
              selectedValue={currency}
              handleChange={handleSelection}
              label="Валюта"
            />
            <DropDownSelect
              data={categoryData?.data}
              selectedValue={selectedCategory}
              handleChange={handleCategoryChange}
              label="Категория"
            />
          </Box>

          <Box sx={{ minWidth: "250px", flex: 1 }}>
            <Discount discount={discount} handleDiscount={handleDiscount} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
