import { PulseLoader } from "react-spinners";
import { CSSProperties } from "react";
import { Box, colors } from "@mui/material";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  padding: "24",
};

type LoaderProps = {
  loading: boolean;
};

const Loader = ({ loading }: LoaderProps) => {
  return (
    <Box sx={{ padding: 8, alignItems: "center" }}>
      <PulseLoader
        color={colors.deepPurple[500]}
        loading={loading}
        cssOverride={override}
        size={24}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};

export default Loader;
