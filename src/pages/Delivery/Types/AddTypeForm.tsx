import { useAddNewTypeMutation } from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";

type FormData = Record<string, string>;

const AddTypeForm = () => {
  const [addNewType, { isLoading }] = useAddNewTypeMutation();

  const handleSubmit = async (data: FormData) => {
    console.log(data);

    return await addNewType(data).unwrap();
  };

  const fields = [{ name: "name", label: "Название типа", required: true }];

  return (
    <UniversalAddForm
      title="Добавить новый тип"
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddTypeForm;
