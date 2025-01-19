import { useNavigate } from "react-router-dom";
import {
  useAddNewProductsMutation,
  useGetAllCategoryQuery,
} from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";
import { useEffect, useState } from "react";

import CategorySelect from "../../../components/CategorySelect/CategorySelect";
import Discount from "../../../components/Discount/Discount";

const AddNewProducts = () => {
  const [addNewProduct, { isLoading }] = useAddNewProductsMutation();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({ page: 1 });
  const navigate = useNavigate();
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
    { name: "currency", label: "Валюта", required: true },
    { name: "active", label: "Активный", type: "checkbox", position: "end" },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
      category_id: selectedCategory,
      discount: discount.price ? discount : undefined,
      active: data.active === "true",
    };

    console.log(formattedData);

    try {
      await addNewProduct({
        category_id: selectedCategory,
        data: formattedData,
      }).unwrap();
      navigate("/products");
    } catch (error) {
      console.error("Ошибка при добавлении продукта", error);
    }
  };

  if (categoryLoading) return <p>Загрузка категорий...</p>;

  return (
    <>
      <UniversalAddForm
        title="Добавить новый продукт"
        fields={fields}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <Discount discount={discount} handleDiscount={handleDiscountChange} />
      <CategorySelect
        categoryData={categoryData}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
    </>
  );
};

export default AddNewProducts;
