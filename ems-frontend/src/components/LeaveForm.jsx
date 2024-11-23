import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaUserClock, FaClipboardList, FaRegCommentDots } from 'react-icons/fa';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    leaveType: '',
    reason: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End Date must be after Start Date.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://crud-tqis.onrender.com/api/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          employeeId: '',
          startDate: '',
          endDate: '',
          leaveType: '',
          reason: '',
        });
      } else {
        setError('Error submitting leave request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('Error submitting leave request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="leave-form-container py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="leave-form-card">
            <Card.Header className="leave-form-header">
              <div className="d-flex align-items-center gap-2">
                <FaUserClock className="header-icon" />
                <h2 className="mb-0">Request Leave</h2>
              </div>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              {success && <Alert variant="success" className="mb-4">Leave request submitted successfully!</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaUserClock />
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
                        <FaClipboardList />
                        Leave Type
                      </Form.Label>
                      <Form.Select
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      >
                        <option value="">Select leave type</option>
                        <option value="SICK">Sick Leave</option>
                        <option value="VACATION">Vacation</option>
                        <option value="PERSONAL">Personal Leave</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaCalendarAlt />
                        Start Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <FaCalendarAlt />
                        End Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center gap-2">
                    <FaRegCommentDots />
                    Reason
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="form-control-lg"
                    placeholder="Please provide a reason for your leave request"
                  />
                </Form.Group>

                <div className="d-grid mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={loading}
                    className="submit-button"
                  >
                    {loading ? 'Submitting...' : 'Submit Leave Request'}
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

export default LeaveForm;
