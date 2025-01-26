import {
  useAddNewProductsMutation,
  useGetAllCategoryQuery,
} from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";
import { useEffect, useState } from "react";

import Discount from "../../../components/Discount/Discount";
import Loading from "../../../components/Loading";
import { Box } from "@mui/material";
import UniversalImgUploader from "../../../components/UniversalImgUploader/UniversalImgUploader";
import DropDownSelect from "../../../components/DropDownSelect/DropDownSelect";

const AddNewProducts = () => {
  const [imageUploaded, setImageUploaded] = useState<
    {
      image: string;
      status: string;
      thumbnail: string;
    }[]
  >([]);
  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const [currency, setCurrency] = useState<string>("");
  const [choosenCurrency, setChoosenCurrency] = useState<string | undefined>();
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
    console.log(e.target.value);
  };
  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedId = e.target.value;
    const newCurrency = variants.find((variant) => variant._id === selectedId);
    setCurrency(e.target.value);

    setChoosenCurrency(newCurrency?.name);
  };

  const fields = [
    { name: "name", label: "Название", required: true },
    { name: "description", label: "Описание" },
    { name: "price", label: "Цена", required: true, type: "number" },
    { name: "weight", label: "Вес", type: "number" },
    { name: "active", label: "Активный", type: "checkbox", position: "end" },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    if (imageUploaded.length == 0) {
      throw {
        data: { message: "Вы забыли загрузить фотографию" },
      };
    }
    if (choosenCurrency == "" || choosenCurrency == undefined) {
      throw {
        data: { message: "Выберите валюту" },
      };
    }

    const formattedData = {
      ...data,
      image: imageUploaded?.[0].image || "",
      price: data?.price,
      category_id: selectedCategory,
      discount: discount.price ? discount : undefined,
      active: data.active == "true",
      currency: choosenCurrency,
    };

    console.log(formattedData);

    await addNewProduct({
      category_id: selectedCategory,
      data: formattedData,
    }).unwrap();
    setImageUploaded([]);
    setPreviewImages([]);
  };

  //поменять на бек чтобы значения приходили через бек
  const variants = [
    { _id: "1", name: "USD" },
    { _id: "2", name: "EUR" },
    { _id: "3", name: "RUB" },
    { _id: "4", name: "UZS" },
    { _id: "5", name: "KZT" },
    { _id: "6", name: "KGS" },
  ];

  if (categoryLoading) return <Loading />;

  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignItems={"center"}
      maxWidth={"80%"}
      margin={"0 auto"}>
      <UniversalImgUploader
        maxLenght={1}
        imagePrev={previewImages}
        setImagePrev={setPreviewImages}
      />

      <UniversalAddForm
        title="Добавить новый продукт"
        fields={fields}
        onSubmit={handleSubmit}
        isLoading={isLoading}
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
          <Discount discount={discount} handleDiscount={handleDiscountChange} />
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewProducts;
