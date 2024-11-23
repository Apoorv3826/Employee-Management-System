import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Badge, Spinner, Alert, Button } from 'react-bootstrap';
import { 
  FiUsers, FiEdit2, FiTrash2, FiUserPlus, 
  FiBriefcase, FiMail, FiPhone 
} from 'react-icons/fi';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';

export default function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAllEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const response = await listEmployees();
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      setError('Failed to fetch employees. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  const updateEmployee = (id) => navigate(`/edit-employee/${id}`);
  
  const removeEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        await getAllEmployees();
        // You could add a success toast notification here
      } catch (error) {
        console.error('Error deleting employee:', error);
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Loading employees...</p>
      </div>
    );
  }

  return (
    <Container fluid className="py-4 bg-light">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="page-title">
              <FiUsers className="title-icon" />
              Employee Report
            </h1>
            <div className="d-flex align-items-center gap-3">
              <Badge bg="primary" className="total-badge">
                Total Employees: {employees.length}
              </Badge>
              <Button
                onClick={() => navigate('/add-employee')}
                className="d-flex align-items-center gap-2"
              >
                <FiUserPlus />
                Add Employee
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      {employees.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <FiUsers size={48} className="text-muted mb-3" />
            <h3 className="text-muted">No Employees Found</h3>
            <p className="text-muted mb-4">Start by adding your first employee</p>
            <Button
              onClick={() => navigate('/add-employee')}
              variant="primary"
            >
              <FiUserPlus className="me-2" />
              Add Employee
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0">Employee</th>
                    <th className="border-0 d-none d-md-table-cell">
                      <FiBriefcase className="me-2" />
                      Department
                    </th>
                    <th className="border-0 d-none d-md-table-cell">
                      <FiPhone className="me-2" />
                      Contact
                    </th>
                    <th className="border-0 d-none d-md-table-cell">
                      <FiMail className="me-2" />
                      Email
                    </th>
                    <th className="border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-initial rounded-circle bg-primary text-white me-3">
                            {employee.firstName.charAt(0)}
                            {employee.lastName.charAt(0)}
                          </div>
                          <div>
                            <h6 className="mb-0">{employee.firstName} {employee.lastName}</h6>
                            <small className="text-muted d-md-none">ID: {employee.id}</small>
                          </div>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <Badge bg="light" text="dark">
                          {employee.department || 'N/A'}
                        </Badge>
                      </td>
                      <td className="d-none d-md-table-cell">{employee.contactNumber || 'N/A'}</td>
                      <td className="d-none d-md-table-cell">{employee.email}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-end">
                          <Button
                            onClick={() => updateEmployee(employee.id)}
                            variant="outline-primary"
                            size="sm"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </Button>
                          <Button
                            onClick={() => removeEmployee(employee.id)}
                            variant="outline-danger"
                            size="sm"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}