import { useNavigate } from "react-router-dom";
import { useAddNewCompanyMutation } from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";

const AddNewCompany = () => {
  const [addNewCompany, { isLoading }] = useAddNewCompanyMutation();
  const navigate = useNavigate();

  const fields = [
    { name: "phone_number", label: "Телефон", required: true },
    { name: "name", label: "Название", required: true },
    { name: "description", label: "Описание" },
    { name: "latitude", label: "Широта", required: true, type: "number" },
    { name: "longitude", label: "Долгота", required: true, type: "number" },
    { name: "full_address", label: "Полный адрес", required: true },
    { name: "timezone", label: "Часовой пояс", required: true },
    { name: "website", label: "Веб-сайт" },
    { name: "owner_telegram_id", label: "Telegram ID владельца" },
    { name: "owner_name", label: "Имя владельца" },
    { name: "type", label: "Тип", required: true },
    { name: "subtypes", label: "Подтипы (через запятую)" },
    { name: "address", label: "Адрес" },
    { name: "district", label: "Район" },
    { name: "street_address", label: "Улица" },
    { name: "city", label: "Город", required: true },
    { name: "zipcode", label: "Почтовый индекс" },
    { name: "state", label: "Штат" },
    { name: "country", label: "Страна", required: true },
    { name: "order_type", label: "Тип заказа" },
    {
      name: "is_accept_orders",
      label: "Принимает заказы",
      type: "checkbox",
      position: "end",
    },
    { name: "is_partner", label: "Партнер", type: "checkbox", position: "end" },
    { name: "social_media.telegram", label: "Telegram" },
    { name: "social_media.instagram", label: "Instagram" },
    { name: "social_media.facebook", label: "Facebook" },
    { name: "business_id", label: "ID бизнеса", required: true },
    { name: "google_id", label: "Google ID" },
    { name: "place_id", label: "Place ID" },
    { name: "google_mid", label: "Google MID" },
    { name: "online_menu_link", label: "Ссылка на меню" },
    { name: "rating", label: "Рейтинг", type: "number" },
    { name: "review_count", label: "Количество отзывов", type: "number" },
    {
      name: "verified",
      label: "Подтверждено",
      type: "checkbox",
      position: "end",
    },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    const formattedData = {
      ...data,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      is_accept_orders: data.is_accept_orders === "true",
      is_partner: data.is_partner === "true",
      subtypes: data.subtypes ? data.subtypes.split(",") : [],
    };

    console.log(formattedData, "22");

    let res = await addNewCompany({ data: formattedData }).unwrap();
    console.log(res);
    
    navigate("/companies");
  };

  return (
    <UniversalAddForm
      title="Добавить новую компанию"
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddNewCompany;
