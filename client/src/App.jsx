import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Board from "./pages/Board";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Board />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
