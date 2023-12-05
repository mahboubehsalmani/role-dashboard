import { Role, Permission } from "../../../services/roleRepository";
import RoleRow from "./roleRow";
import Loader from "../../../components/loader";
import {
  Paper,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  colors,
} from "@mui/material";

type tableProps = {
  roles: Role[];
  permissions: Permission[];
  editPermissionsForRole: (
    id: string,
    permissions: Permission[],
    setOpen: (open: boolean) => void
  ) => void;
  loading: boolean;
  editPermissionLoading: boolean;
};

const MuiTable = ({
  roles,
  loading,
  permissions,
  editPermissionsForRole,
  editPermissionLoading,
}: tableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: colors.deepPurple[50] }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Role
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Persmission(s)
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            roles.map((role) => {
              return (
                <RoleRow
                  key={role.id}
                  row={role}
                  permissions={permissions}
                  editPermissionsForRole={editPermissionsForRole}
                  editPermissionLoading={editPermissionLoading}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTable;
