import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import Sidebar from './components/SideBar';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import EmployeeComponent from './components/EmployeeComponent';
import LeaveForm from './components/LeaveForm';
import LeaveReport from './components/LeaveReport';
import SalaryForm from './components/SalaryFrom';
import SalaryReport from './components/SalaryReport';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path='/' element={<ListEmployeeComponent />} />
              <Route path='/employees' element={<ListEmployeeComponent />} />
              <Route path='/add-employee' element={<EmployeeComponent />} />
              <Route path='/edit-employee/:id' element={<EmployeeComponent />} />
              <Route path='/add-leaves' element={<LeaveForm />} />
              <Route path='/leaves-report' element={<LeaveReport />} />
              <Route path="/add-salary" element={<SalaryForm />} />
              <Route path='/salary-report' element={<SalaryReport />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </div>
    </BrowserRouter>
  );
}