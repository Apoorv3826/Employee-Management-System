import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUser, FiMail, FiBriefcase, FiPhone, FiSave, FiArrowLeft } from 'react-icons/fi';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';

export default function EmployeeComponent() {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    contactNumber: '',
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => { 
       const data = response.data;
      setEmployee({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        department: data.department || '',
        contactNumber: data.contactNumber || ''
      });
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating field ${name} with value ${value}`);
    setEmployee({ ...employee, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!employee.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!employee.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!employee.email.trim()) newErrors.email = 'Email is required';
    if (!employee.department.trim()) newErrors.department = 'Department is required';
    if (!employee.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
    else if (!/^\d{10}$/.test(employee.contactNumber)) newErrors.contactNumber = 'Contact Number must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const promise = id ? updateEmployee(id, employee) : createEmployee(employee);
      promise.then(() => navigate('/')).catch(console.error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">{id ? 'Update Employee' : 'Add Employee'}</h2>
            </div>
            <div className="card-body">
              <form onSubmit={saveOrUpdateEmployee}>
                <div className="row g-3">
                  {['firstName', 'lastName', 'email', 'department', 'contactNumber'].map((field) => (
                    <div key={field} className="col-md-6">
                      <label htmlFor={field} className="form-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          {field === 'firstName' || field === 'lastName' ? (
                            <FiUser />
                          ) : field === 'email' ? (
                            <FiMail />
                          ) : field === 'department' ? (
                            <FiBriefcase />
                          ) : (
                            <FiPhone />
                          )}
                        </span>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                          id={field}
                          name={field}
                          value={employee[field]}
                          onChange={handleInputChange}
                          placeholder={field === 'contactNumber' ? 'Enter 10-digit contact number' : ''}
                        />
                        {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
                    <FiArrowLeft className="me-2" /> Back
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <FiSave className="me-2" /> {id ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}