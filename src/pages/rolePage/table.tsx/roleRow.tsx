import * as React from "react";
import { KeyboardArrowUp, Edit } from "@mui/icons-material";
import { Role, Permission, RoleId } from "../../../services/roleRepository";
import { TableCell, TableRow, IconButton, colors } from "@mui/material";
import CollapseRow from "./collapseRow";
import PermissionsForRole from "./permissionsForRole";

type RowProps = {
  row: Role;
  permissions: Permission[];
  editPermissionLoading: boolean;
  editPermissionsForRole: (
    id: RoleId,
    permissions: Permission[],
    setOpen: (open: boolean) => void
  ) => void;
};
const RoleRow = ({
  row,
  editPermissionsForRole,
  editPermissionLoading,
  permissions,
}: RowProps) => {
  const [open, setOpen] = React.useState(false);
  const [permissionsForRole, setPermissionsForRole] = React.useState<
    Permission[]
  >(row.permissions);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset", fontSize: "1rem" } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>
          <PermissionsForRole row={row} />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUp sx={{ color: colors.purple[500] }} />
            ) : (
              <Edit sx={{ color: colors.purple[500] }} />
            )}
          </IconButton>{" "}
        </TableCell>
      </TableRow>
      <CollapseRow
        editPermissionLoading={editPermissionLoading}
        permissions={permissions}
        row={row}
        open={open}
        setOpen={setOpen}
        setPermissionsForRole={setPermissionsForRole}
        permissionsForRole={permissionsForRole}
        editPermissionsForRole={editPermissionsForRole}
      />
    </React.Fragment>
  );
};

export default RoleRow;
