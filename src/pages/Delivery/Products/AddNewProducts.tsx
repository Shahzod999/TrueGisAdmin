import {
  useAddNewProductsMutation,
  useGetAllCategoryQuery,
} from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";
import { useEffect, useState } from "react";
import CategorySelect from "../../../components/CategorySelect/CategorySelect";
import Discount from "../../../components/Discount/Discount";
import Loading from "../../../components/Loading";
import { Box } from "@mui/material";
import UniversalImgUploader from "../../../components/UniversalImgUploader/UniversalImgUploader";

const AddNewProducts = () => {
  const [imageUploaded, setImageUploaded] = useState<string | null>("");

  console.log(imageUploaded, "mi tut");

  const [addNewProduct, { isLoading }] = useAddNewProductsMutation();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({ page: 1 });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [discount, setDiscount] = useState({
    price: 0,
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (categoryData?.data && categoryData.data.length > 0) {
      setSelectedCategory(categoryData.data[0]._id);
    }
  }, [categoryData]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscount((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const fields = [
    { name: "name", label: "Название", required: true },
    { name: "description", label: "Описание" },
    { name: "price", label: "Цена", required: true, type: "number" },
    { name: "weight", label: "Вес", type: "text" },
    { name: "currency", label: "USD", required: true },
    { name: "active", label: "Активный", type: "checkbox", position: "end" },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    const formattedData = {
      ...data,
      image: "//",
      price: data?.price,
      category_id: selectedCategory,
      discount: discount.price ? discount : undefined,
      active: data.active === "true",
    };

    console.log(formattedData);

    await addNewProduct({
      category_id: selectedCategory,
      data: formattedData,
    }).unwrap();
  };

  if (categoryLoading) return <Loading />;

  return (
    <Box
      display="flex"
      gap={4}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignItems={"center"}
      maxWidth={"80%"}
      margin={"0 auto"}>
      <UniversalImgUploader setImageUploaded={setImageUploaded} />

      <UniversalAddForm
        title="Добавить новый продукт"
        fields={fields}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <Box>
        <CategorySelect
          categoryData={categoryData}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />

        <Discount discount={discount} handleDiscount={handleDiscountChange} />
      </Box>
    </Box>
  );
};

export default AddNewProducts;
