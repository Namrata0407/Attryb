import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import OEM from "./OEM";
import AddCar from "./AddCar";
import DetailPage from "./DetailPage";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/oem" element={<OEM />} />
        <Route path="/addcar" element={<AddCar />} />
        <Route path="/detailpage" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default Allroutes;