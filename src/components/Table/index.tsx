"use client";

import {
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer,
  Table as MUITable,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./Table.module.scss";

export default function Table<
  T extends Record<string, TTableAcceptableValues>
>({ headers, actions, data, ignoreIdColumn = true }: TProps<T>) {
  const showActionsCell =
    actions != undefined && Object.values(actions).some((a) => a != undefined);
  const headersId = headers.map((h) => h.id);
  return (
    <TableContainer className={styles.table}>
      <MUITable>
        <TableHead>
          <TableRow>
            {headers
              .map(({ id, label }, i) =>
                id == "id" && ignoreIdColumn ? null : (
                  <TableCell key={i}>{label}</TableCell>
                )
              )
              .filter(Boolean)}
            {showActionsCell && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={i}>
              {headersId
                .map((hk, j) =>
                  hk == "id" && ignoreIdColumn ? null : (
                    <TableCell key={j}>{d[hk]}</TableCell>
                  )
                )
                .filter(Boolean)}
              {showActionsCell && (
                <TableCell>
                  {actions.watch && (
                    <IconButton
                      onClick={() => actions.watch && actions.watch(d as T)}
                    >
                      <VisibilityIcon sx={{ color: "var(--orange)" }} />
                    </IconButton>
                  )}

                  {actions.edit && (
                    <IconButton
                      onClick={() => actions.edit && actions.edit(d as T)}
                    >
                      <EditIcon sx={{ color: "var(--lightGreen)" }} />
                    </IconButton>
                  )}

                  {actions.delete && (
                    <IconButton
                      onClick={() => actions.delete && actions.delete(d as T)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
}

type TTableAcceptableValues = string | number | string[] | number[];

type THeader<T extends Record<string, TTableAcceptableValues>> = {
  id: keyof T;
  label: string;
};

type TData<T extends Record<string, TTableAcceptableValues>> = {
  [K in keyof T]: TTableAcceptableValues;
}[];

type TProps<T extends Record<string, TTableAcceptableValues>> = {
  headers: THeader<T>[];
  data: TData<T>;
  actions?: {
    watch?: (row: T) => void;
    edit?: (row: T) => void;
    delete?: (row: T) => void;
  };
  ignoreIdColumn?: boolean;
};
