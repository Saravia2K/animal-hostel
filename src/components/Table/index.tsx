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

export default function Table<T extends Record<string, TTableAcceptableValues>>(
  props: TProps<T>
) {
  const {
    headers,
    actions,
    data,
    ignoreIdColumn = true,
    forceHideAction,
    extraActions,
  } = props;

  const showActionsCell =
    actions != undefined && Object.values(actions).some((a) => a != undefined);
  const headersId = headers.map((h) => h.id);

  const hideAction = (row: T, action: "watch" | "edit" | "delete") => {
    return forceHideAction && forceHideAction[action]
      ? forceHideAction[action](row)
      : false;
  };

  return (
    <TableContainer className={styles.table}>
      <MUITable>
        <TableHead>
          <TableRow>
            {headers
              .map(({ id, label }, i) =>
                id == "id" && ignoreIdColumn ? null : (
                  <TableCell key={i} sx={{ minWidth: 150 }}>
                    {label}
                  </TableCell>
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
                  {actions.watch && !hideAction(d as T, "watch") && (
                    <IconButton
                      onClick={() => actions.watch && actions.watch(d as T)}
                    >
                      <VisibilityIcon sx={{ color: "var(--orange)" }} />
                    </IconButton>
                  )}

                  {actions.edit && !hideAction(d as T, "edit") && (
                    <IconButton
                      onClick={() => actions.edit && actions.edit(d as T)}
                    >
                      <EditIcon sx={{ color: "var(--lightGreen)" }} />
                    </IconButton>
                  )}

                  {actions.delete && !hideAction(d as T, "delete") && (
                    <IconButton
                      onClick={() => actions.delete && actions.delete(d as T)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  )}

                  {extraActions &&
                    extraActions
                      .map(({ icon: Icon, onClick, forceHideAction }, i) =>
                        forceHideAction && !forceHideAction(d as T) ? null : (
                          <IconButton key={i} onClick={() => onClick(d as T)}>
                            {Icon}
                          </IconButton>
                        )
                      )
                      .filter(Boolean)}
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

type TTableAcceptableValuesObj = Record<string, TTableAcceptableValues>;

type THeader<T extends TTableAcceptableValuesObj> = {
  id: keyof T;
  label: string;
  render?: boolean;
};

type TData<T extends TTableAcceptableValuesObj> = {
  [K in keyof T]: TTableAcceptableValues;
}[];

type TProps<T extends TTableAcceptableValuesObj> = {
  headers: THeader<T>[];
  data: TData<T>;
  actions?: {
    watch?: (row: T) => void;
    edit?: (row: T) => void;
    delete?: (row: T) => void;
  };
  ignoreIdColumn?: boolean;
  forceHideAction?: {
    watch?: (row: T) => boolean;
    edit?: (row: T) => boolean;
    delete?: (row: T) => boolean;
  };
  extraActions?: TExtraAction<T>[];
};

type TExtraAction<T extends TTableAcceptableValuesObj> = {
  icon: JSX.Element;
  onClick: (row: T) => void;
  forceHideAction?: (row: T) => boolean;
};
