import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { FaMoneyBillWave, FaUserTie, FaCalendarAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const SalaryForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    month: '',
    year: new Date().getFullYear(),
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateNetSalary = () => {
    const basicSalary = parseFloat(formData.basicSalary) || 0;
    const allowances = parseFloat(formData.allowances) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    return basicSalary + allowances - deductions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const payload = {
      ...formData,
      netSalary: calculateNetSalary(),
    };

    try {
      const response = await fetch('https://crud-tqis.onrender.com/api/salaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          employeeId: '',
          basicSalary: '',
          allowances: '',
          deductions: '',
          month: '',
          year: new Date().getFullYear(),
        });
      } else {
        setError('Failed to add salary details');
      }
    } catch (error) {
      console.error('Error adding salary details:', error);
      setError('Error adding salary details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="salary-form-container py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="salary-form-card">
            <Card.Header className="salary-form-header">
              <div className="d-flex align-items-center gap-2">
                <FaMoneyBillWave className="header-icon" />
                <h2 className="mb-0">Add Salary Details</h2>
              </div>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              {success && <Alert variant="success" className="mb-4">Salary details added successfully!</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaUserTie />
                        Employee ID
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaMoneyBillWave />
                        Basic Salary
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="basicSalary"
                        value={formData.basicSalary}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaPlusCircle className="text-success" />
                        Allowances
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="allowances"
                        value={formData.allowances}
                        onChange={handleChange}
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaMinusCircle className="text-danger" />
                        Deductions
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="deductions"
                        value={formData.deductions}
                        onChange={handleChange}
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaCalendarAlt />
                        Month
                      </Form.Label>
                      <Form.Control
                        type="month"
                        name="month"
                        value={`${formData.year}-${formData.month}`}
                        onChange={(e) => {
                          const [year, month] = e.target.value.split('-');
                          setFormData({ ...formData, year: parseInt(year), month });
                        }}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Net Salary (Calculated)</Form.Label>
                      <div className="calculated-salary">
                        {calculateNetSalary().toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        })}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Salary Details'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SalaryForm;