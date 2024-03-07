import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useController, Control } from "react-hook-form";

interface FormTextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ control, name, label, placeholder }) => {
  const { field, fieldState: { error } } = useController({ name, control });

  return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        {error && <FormMessage>{error.message}</FormMessage>}
      </FormItem>
  );
};
