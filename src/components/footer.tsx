import { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography, colors } from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";

export const Footer: FC = (): ReactElement => {
  const linkedInUrl = "https://www.linkedin.com/in/mahboubeh-salmani/";
  const githubUrl = "";
  const emailAddress = "m.salmanijelodar@gmail.com";

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: colors.deepPurple[600],
        paddingTop: "1rem",
        paddingBottom: "1rem",
        borderTop: "1px solid #000",
        marginTop: "auto",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {`${new Date().getFullYear()} | React | Typescript | Material UI`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <Link
                href={"mailto:" + emailAddress}
                target="_blank"
                underline="none"
                color="inherit"
                sx={{ marginRight: 1 }}
              >
                <Email />
              </Link>
              <Link
                href={linkedInUrl}
                target="_blank"
                underline="none"
                color="inherit"
                sx={{ marginRight: 1 }}
              >
                <LinkedIn />
              </Link>
              <Link
                href={githubUrl}
                target="_blank"
                underline="none"
                color="inherit"
              >
                <GitHub />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
