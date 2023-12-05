import { ToastContainer } from "react-toastify";
import "./App.css";
import RolePage from "./pages/rolePage/main";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <Header />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RolePage />
        <Footer />
      </Box>
    </div>
  );
}

export default App;
