"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function LocaleSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const [selectedLocale, setSelectedLocale] = useState(locale);

  const handleLocaleChange = (value: string) => {
    setSelectedLocale(value); 
    router.replace(`/${value}`);
  };

  return (
    <Select onValueChange={handleLocaleChange} value={selectedLocale}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
      </SelectContent>
    </Select>
  );
}
