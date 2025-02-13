import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";

interface PermissionsPopupProps {
  onClose: () => void;
  onAssign: (
    ...args: [string | undefined, string, permissionsType]
  ) => Promise<void>;
  adminId: string | undefined;
  companyId: string;
}

export interface permissionsType {
  admins: boolean;
  analytics: boolean;
  category: boolean;
  products: boolean;
  comments: boolean;
  discounts: boolean;
}

const PermissionsPopup = ({
  onClose,
  onAssign,
  adminId,
  companyId,
}: PermissionsPopupProps) => {
  // Состояние для хранения прав
  const [permissions, setPermissions] = useState<permissionsType>({
    admins: true,
    analytics: true,
    category: true,
    products: true,
    comments: true,
    discounts: true,
  });

  // Обработчик изменения прав
  const handlePermissionChange =
    (key: keyof permissionsType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPermissions({ ...permissions, [key]: event.target.checked });
    };

  // Обработчик отправки прав
  const handleAssign = () => {
    onAssign(adminId, companyId, permissions);
    onClose(); // Закрыть попап после отправки
  };

  return (
    <Dialog open={!!companyId} onClose={onClose}>
      <DialogTitle>Настройка прав админа</DialogTitle>
      <DialogContent>
        {Object.entries(permissions).map(([key, value]) => (
          <FormControlLabel
            key={key}
            control={
              <Switch
                checked={value}
                onChange={handlePermissionChange(key as keyof permissionsType)}
                color="primary"
              />
            }
            label={key}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={handleAssign} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionsPopup;
