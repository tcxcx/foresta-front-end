// ToggleSwitchField.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleSwitchFieldProps {
  id: string;
  name: string;
  label: string;
  register: UseFormRegister<any>;
  onChange: () => void;
}

const ToggleSwitchField: React.FC<ToggleSwitchFieldProps> = ({ id, name, label, register, onChange }) => (
  <div className="flex items-center space-x-2">
    <Switch id={id} {...register(name)} onChange={onChange} />
    <Label htmlFor={id}>{label}</Label>
  </div>
);

export default ToggleSwitchField;
