"use client";

import { useRef } from "react";
import { TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Input from "../Input";

export default function SearchInput(props: TProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { onChange, ..._props } = props;

  const handleSearch = () => {
    onChange(inputRef.current?.value || "");
  };

  return (
    <Input
      {..._props}
      placeholder="Escribe tu búsqueda aquí"
      onChange={handleSearch}
      slotProps={{
        input: {
          endAdornment: <SearchIcon sx={{ color: "var(--orange)" }} />,
          slotProps: {
            root: {
              sx: { borderRadius: "50px !important" },
            },
          },
        },
      }}
      sx={{ backgroundColor: "#fff", borderRadius: "50px" }}
      ref={inputRef}
    />
  );
}

type TProps = Omit<TextFieldProps, "onChange"> & {
  onChange: (text: string) => void;
};
