import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";

const OrderSingle = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetSingleOrderQuery({ id });

  const [deleteOrder] = useDeleteOrderMutation();

  const fetchData = async () => {
    if (!data) throw new Error("Данные отсутствуют");
    return data?.data;
  };

  const updateOneData = async () => {};

  const deleteData = async (id: string) => {
    await deleteOrder({ id }).unwrap();
    navigate(-1); // Перенаправление после удаления
  };

  const fields = [
    { name: "order_number", label: "Номер заказа" },
    { name: "customer_name", label: "Имя клиента" },
    { name: "phone", label: "Телефон" },
    { name: "status", label: "Статус заказа" },
    { name: "total_amount", label: "Сумма заказа" },
    { name: "items_count", label: "Количество товаров" },
    { name: "created_at", label: "Дата создания" },
    { name: "updated_at", label: "Дата обновления" },
    { name: "delivery_address", label: "Адрес доставки" },
    { name: "payment_method", label: "Метод оплаты" },
    { name: "is_paid", label: "Оплачено", type: "checkbox" },
    { name: "delivery_status", label: "Статус доставки" },
    { name: "notes", label: "Примечания" },
  ];

  if (isLoading) return <Loading />;

  return (
    <UniversalDetails
      title="Детали заказа"
      id={id || ""}
      fetchData={fetchData}
      updateData={updateOneData}
      deleteData={deleteData}
      fields={fields}
      redirectAfterDelete="/orders"
    />
  );
};

export default OrderSingle;
