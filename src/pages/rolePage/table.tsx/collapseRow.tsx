import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  TableCell,
  TableRow,
  Typography,
  colors,
} from "@mui/material";
import Loader from "../../../components/loader";
import { CancelOutlined, CheckOutlined } from "@mui/icons-material";
import { Permission, Role, RoleId } from "../../../services/roleRepository";

type CollapseRowProps = {
  row: Role;
  editPermissionLoading: boolean;
  permissions: Permission[];
  editPermissionsForRole: (
    id: RoleId,
    permissions: Permission[],
    setOpen: (open: boolean) => void
  ) => void;
  setOpen: (open: boolean) => void;

  setPermissionsForRole: (permissions: Permission[]) => void;
  permissionsForRole: Permission[];
  open: boolean;
};

const CollapseRow = ({
  row,
  permissions,
  editPermissionLoading,
  editPermissionsForRole,
  setPermissionsForRole,
  permissionsForRole,
  setOpen,
  open,
}: CollapseRowProps) => {
  return (
    <TableRow>
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          backgroundColor: colors.grey[50],
        }}
        colSpan={6}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          {editPermissionLoading ? (
            <Loader loading={editPermissionLoading} />
          ) : (
            <Box sx={{ margin: 1, marginBottom: 4 }}>
              <Typography sx={{ fontStyle: "italic" }} gutterBottom>
                Edti permissions
              </Typography>
              <FormGroup>
                {permissions.map((permission) => {
                  return (
                    <FormControlLabel
                      key={permission.id}
                      control={
                        <Checkbox
                          size="small"
                          defaultChecked={row.permissions.some(
                            (obj) =>
                              obj.id === permission.id &&
                              obj.name === permission.name
                          )}
                          onChange={(value) => {
                            if (value.target.checked) {
                              setPermissionsForRole([
                                ...permissionsForRole,
                                permission,
                              ]);
                            } else {
                              setPermissionsForRole(
                                permissionsForRole.filter(
                                  (p) => p.id != permission.id
                                )
                              );
                            }
                          }}
                        />
                      }
                      label={permission.name}
                    />
                  );
                })}
              </FormGroup>
              <Box>
                <Button
                  size="small"
                  color="success"
                  variant="outlined"
                  onClick={() => {
                    editPermissionsForRole(
                      row.id,
                      [...permissionsForRole],
                      setOpen
                    );
                  }}
                >
                  <CheckOutlined />
                </Button>
                <Button
                  size="small"
                  sx={{
                    marginLeft: 1,
                  }}
                  color="error"
                  variant="outlined"
                  onClick={() => setOpen(false)}
                >
                  <CancelOutlined />
                </Button>
              </Box>
            </Box>
          )}
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapseRow;
