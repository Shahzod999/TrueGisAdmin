import { useParams } from "react-router";
import { useAddNewCategoryMutation } from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";

type FormData = Record<string, string>;

const AddNewCategory = () => {
  const { companyId } = useParams();

  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();

  // мы тут
  const handleSubmit = async (data: FormData) => {
    try {
      const res = await addNewCategory({
        ...data,
        company_id: companyId,
      }).unwrap();

      return res;
    } catch (error) {
      throw error;
    }
  };

  const fields = [
    { name: "name", label: "Название категории", required: true },
    { name: "image", label: "Ссылка на изображение", required: false },
  ];

  return (
    <UniversalAddForm
      title="Добавить новую категорию"
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddNewCategory;
