import { Box, colors } from "@mui/material";
import { Role } from "../../../services/roleRepository";

type PermissionsForRoleProps = {
  row: Role;
};

const PermissionsForRole = ({ row }: PermissionsForRoleProps) => {
  return (
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
  );
};

export default PermissionsForRole;
