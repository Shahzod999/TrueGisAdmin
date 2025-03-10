import { useAddNewTypeMutation } from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";

type FormData = Record<string, string>;

const AddTypeForm = () => {
  const [addNewType, { isLoading }] = useAddNewTypeMutation();

  const handleSubmit = async (data: FormData) => {
    try {
      let res = await addNewType(data).unwrap();
      return res;
    } catch (err) {
      throw err;
    }
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
