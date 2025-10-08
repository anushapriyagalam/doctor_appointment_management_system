import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/User Login/Login.jsx";
import Signup from "./Components/User Login/Signup.jsx";
import User from "./Components/User/User.jsx";
import Doctors from "./Components/Doctor/Doctors.jsx";
import Doctor from "./Components/Doctor/Doctor.jsx";
import Appointment from "./Components/Appointment/Appointment.jsx";
import AppointmentHistory from "./Components/Appointment/AppointmentHistory.jsx";
import Menu from "./Components/Menu/Menu.jsx";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Appointments from "./Components/Appointment/Appointments.jsx";
import DoctorAppointments from "./Components/Appointment/DoctorAppointments.jsx";
import DoctorInfo from "./Components/Doctor/DoctorInfo.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* http://localhost:3000/login */}
          <Route path="/login" element={<Login />}></Route>
          {/* http://localhost:3000/signup */}
          <Route path="/signup" element={<Signup />}></Route>
          {/* http://localhost:3000/ */}
          <Route path="/" element={<Menu />}></Route>
          {/* http://localhost:3000/menu */}
          <Route path="/menu" element={<Menu />}></Route>
          {/* http://localhost:3000/user-details */}
          <Route path="/user-details" element={<User />}></Route>
          {/* http://localhost:3000/doctors */}
          <Route path="/doctors" element={<Doctors />}></Route>
          {/* http://localhost:3000/doctor-info */}
          <Route path="/doctor-info" element={<DoctorInfo />}></Route>
          {/* http://localhost:3000/doctor */}
          <Route path="/doctor/:id" element={<Doctor />}></Route>
          {/* http://localhost:3000/appointment */}
          <Route path="/appointment" element={<Appointment />}></Route>
          {/* http://localhost:3000/appointment-details */}
          <Route path="/appointment-details" element={<AppointmentHistory />}></Route>
          {/* http://localhost:3000/appointments */}
          <Route path="/appointments" element={<Appointments />}></Route>
          {/* http://localhost:3000/doctor-appointments */}
          <Route path="/doctor-appointments" element={<DoctorAppointments />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
