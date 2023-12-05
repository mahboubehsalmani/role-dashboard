import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  KeyboardArrowUp,
  Edit,
  CheckOutlined,
  CancelOutlined,
} from "@mui/icons-material";
import { Role, Permission, RoleId } from "../../../services/roleRepository";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup, colors } from "@mui/material";
import Loader from "../../../components/loader";

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
const TRow = ({
  row,
  editPermissionsForRole,
  editPermissionLoading,
  permissions,
}: RowProps) => {
  const [open, setOpen] = React.useState(false);
  const [permissionsForRole, setPermissionsForRole] = React.useState<
    Permission[]
  >([]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset", fontSize: "1rem" } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex" }}>
            {row.permissions.length == 0 ? (
              <Box
                sx={{
                  border: `1px solid ` + colors.deepOrange[500],
                  color: colors.deepOrange[500],
                  borderRadius: "5px",
                  padding: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  margin: "2px",
                  flexWrap: "wrap",
                  fontSize: "1rem",
                }}
              >
                Not set
              </Box>
            ) : (
              row.permissions.map((permission) => {
                return (
                  <Box
                    key={permission.id}
                    sx={{
                      border: "1px solid " + colors.deepPurple[500],
                      color: colors.deepPurple[500],
                      borderRadius: "5px",
                      padding: "4px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      margin: "2px",
                    }}
                  >
                    {permission.name}
                  </Box>
                );
              })
            )}
          </Box>
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
    </React.Fragment>
  );
};

export default TRow;
