import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormTextInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  placeholder,
  type = 'text',
  error,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};
