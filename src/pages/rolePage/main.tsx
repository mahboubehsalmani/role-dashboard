import { useEffect, useState } from "react";
import MuiTable from "./table.tsx/muiTable";
import {
  MockRoleService,
  Role,
  Permission,
  RoleId,
} from "../../services/roleRepository";
import { Box } from "@mui/system";
import { toast } from "react-toastify";

const RolePage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editPermissionLoading, setEditPermissionLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retryGetRoles, setRetryGetRoles] = useState<boolean>(false);
  const [retryGetPermissions, setRetryGetPermissions] =
    useState<boolean>(false);
  const [retrySetPermissions, setRetrySetPermissions] =
    useState<boolean>(false);

  useEffect(() => {
    getRoles();
    getPermissions();
  }, []);

  const getRoles = () => {
    const roleService = new MockRoleService();
    roleService
      .getRoles()
      .then((fetchedRoles) => {
        setRoles(fetchedRoles);
        setLoading(false);
        setRetryGetRoles(false);
      })
      .catch((err) => {
        if (!retryGetRoles) {
          getRoles();
          setRetryGetRoles(true);
        } else {
          setError("Failed to load roles");
          setLoading(false);
          toast.error("Failed to load roles!");
          setRetryGetRoles(false);
        }
      });
  };

  const getPermissions = () => {
    const roleService = new MockRoleService();
    roleService
      .getPermissions()
      .then((fetchedPermissions) => {
        setPermissions(fetchedPermissions);
        setLoading(false);
        setRetryGetPermissions(false);
      })
      .catch((err) => {
        if (!retryGetPermissions) {
          getPermissions();
          setRetryGetPermissions(true);
        } else {
          setError("Failed to load permissions");
          setLoading(false);
          toast.error("Failed to load permissions!");
          setRetryGetPermissions(false);
        }
      });
  };

  const editPermissionsForRole = (
    id: RoleId,
    permissionsForRole: Permission[],
    setOpen: (open: boolean) => void
  ) => {
    setEditPermissionLoading(true);
    const roleService = new MockRoleService();
    roleService
      .setPermissionsForRole(id, permissionsForRole)
      .then((fetchedPermissionsForRole) => {
        setEditPermissionLoading(false);
        setError(null);
        let tempRoles = [...roles];
        tempRoles.forEach((role) => {
          if (role.id === id) {
            role.permissions = fetchedPermissionsForRole.permissions;
          }
        });
        setRoles(tempRoles);
        setRetrySetPermissions(false);
        toast.success("Permissions updated successfully!");
        setOpen(false);
      })
      .catch((err) => {
        if (!retrySetPermissions) {
          editPermissionsForRole(id, permissionsForRole, setOpen);
          setRetrySetPermissions(true);
        } else {
          setError("Faile to update permisions");
          setEditPermissionLoading(false);
          setRetrySetPermissions(false);
          toast.error("Faile to update permisions!");
        }
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
        width: "75%",
      }}
    >
      <MuiTable
        roles={roles}
        permissions={permissions}
        loading={loading}
        editPermissionLoading={editPermissionLoading}
        error={error}
        editPermissionsForRole={editPermissionsForRole}
      />
    </Box>
  );
};

export default RolePage;
