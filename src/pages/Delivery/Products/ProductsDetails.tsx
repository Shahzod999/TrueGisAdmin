import { useNavigate, useParams } from "react-router-dom";

import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import ImageSlider from "../../../components/ImageSlider";
import { Box, Button, Paper } from "@mui/material";
import {
  useAddCompanyLinkMutation,
  useDeleteProductsMutation,
  useGetAllCategoryQuery,
  useGetSingleProductsQuery,
  useRemoveCompanyLinksMutation,
  useUpdateProductsMutation,
} from "../../../app/api/deliverySlice";
import { useEffect, useState } from "react";
import { CategoryType } from "../../../app/types/productsTypes";

import Discount from "../../../components/Discount/Discount";
import DropDownSelect from "../../../components/DropDownSelect/DropDownSelect";
import GetAllCompany from "../Company/GetAllCompany";
import useSnackbar from "../../../app/hook/callSnackBar";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";

const ProductDetails = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();

  const [addCompanyLink, { isLoading: addCompanyLinkLoadiog }] =
    useAddCompanyLinkMutation();
  const [removeCompanyLinks, { isLoading: removeCompanyLinkLoadiog }] =
    useRemoveCompanyLinksMutation();

  const { id, companyId } = useParams();

  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<string>("");
  const [choosenCurrency, setChoosenCurrency] = useState<string>("");
  const [assignedCompanies, setAssignedCompanies] = useState<string[]>([]);
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

    if (data?.data?.companies) {
      let assignedCompanies = data.data.companies.map((item: any) => item._id);
      setAssignedCompanies(assignedCompanies);
    }
  }, [data]);

  // filter

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

  const handleAssignCompany = async (companyId: string) => {
    try {
      let res = await addCompanyLink({
        data: {
          product_id: id,
          company_ids: [...assignedCompanies, companyId],
        },
      }).unwrap();

      triggerSnackbar(
        `${res?.status} успешно добавлен!` || "успешно добавлен!",
        "success",
      );
    } catch (err) {
      console.log(err);
      triggerSnackbar(
        (err as any).data.message || "Произошла неизвестная ошибка",
        "error",
      );
    }
  };

  const handleRemoveCompany = async (companyId: string) => {
    try {
      let res = await removeCompanyLinks({
        data: {
          product_id: id,
          company_ids: [companyId],
        },
      }).unwrap();
      triggerSnackbar(
        `${res?.status} успешно удален!` || "успешно удален!",
        "success",
      );
    } catch (err) {
      console.log(err);
      triggerSnackbar(
        (err as any).data.message || "Произошла неизвестная ошибка",
        "error",
      );
    }
  };

  const handleSetAssignIdCompany = async (
    companyId: string,
    is_assigned: boolean,
  ) => {
    if (is_assigned) {
      handleRemoveCompany(companyId);
    } else {
      handleAssignCompany(companyId);
    }
  };

  const columns = [
    { field: "name", headerName: "Название" },
    { field: "city", headerName: "Город" },
    { field: "country", headerName: "Страна" },
    { field: "phone_number", headerName: "Телефон" },
    { field: "full_address", headerName: "Адрес" },
  ];
  const handleView = (id: string) => {
    navigate(`/delivery-company/${id}`);
  };

  const allCompanyAssigned =
    data?.data?.companies?.map((item: any) => ({
      ...item,
      is_assigned: true,
    })) || [];

  if (isLoading || categoryLoading) return <Loading />;
  return (
    <>
      {(updateLoading ||
        deleteLoading ||
        addCompanyLinkLoadiog ||
        removeCompanyLinkLoadiog) && <Loading />}
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

        <Paper
          elevation={2}
          sx={{
            margin: "1rem",
            padding: "1rem",
            borderRadius: "8px",
            width: "100%",
          }}>
          <Box gap={2} mt={2} mb={4}>
            <UniversalTable
              title={"Связанные Компании"}
              data={allCompanyAssigned}
              columns={columns}
              isLoading={isLoading}
              onDelete={handleRemoveCompany}
              onView={handleView}
              handleSetAssignIdCompany={handleSetAssignIdCompany}
            />
          </Box>

          <Button
            color="secondary"
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#125ea8" },
            }}
            onClick={() => setOpen(!open)}>
            Связать Компанию
          </Button>
          {open && (
            <GetAllCompany
              parent="Company"
              handleSetAssignIdCompany={handleAssignCompany}
              assignedCompanies={assignedCompanies}
            />
          )}
        </Paper>
      </Box>
    </>
  );
};

export default ProductDetails;
