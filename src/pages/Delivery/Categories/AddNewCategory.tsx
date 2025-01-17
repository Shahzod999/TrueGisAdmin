import { useAddNewCategoryMutation } from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";

type FormData = Record<string, string>;

const AddNewCategory = () => {
  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();

  const handleSubmit = async (data: FormData) => {
    await addNewCategory({
      data,
      id: "673a89577d6d20cabf0ad3d5",
    }).unwrap();
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
