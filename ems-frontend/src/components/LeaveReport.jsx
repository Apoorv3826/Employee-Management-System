import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
import { FaCalendarCheck, FaUser, FaHistory, FaExclamationCircle } from 'react-icons/fa';

const LeaveReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllLeaveReports = async () => {
      try {
        const response = await fetch('https://crud-tqis.onrender.com/api/leaves/report');
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          setError('Failed to fetch leave reports');
        }
      } catch (error) {
        setError('Error fetching leave reports');
        console.error('Error fetching leave reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeaveReports();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Loading leave reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container fluid className="py-4">
        <Card className="error-card">
          <Card.Body className="text-center py-5">
            <FaExclamationCircle className="text-danger mb-3" size={48} />
            <h3>{error}</h3>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="leave-reports-container">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="page-title">
              <FaCalendarCheck className="title-icon" />
              Leave Reports
            </h1>
            <Badge bg="primary" className="total-badge">
              Total Reports: {reports.length}
            </Badge>
          </div>
        </Col>
      </Row>

      {reports.map((report, index) => (
        <Card key={index} className="leave-card">
          <Card.Header className="leave-card-header">
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="employee-title">
                  <FaUser className="me-2" />
                  Employee Details
                </h2>
                <div className="employee-id">ID: {report.employeeId}</div>
              </Col>
              <Col md={6} className="text-md-end">
                <div className="leaves-container">
                  <FaHistory className="leaves-icon" />
                  <div>
                    <div className="leaves-label">Total Leaves Taken</div>
                    <div className="leaves-amount">{report.totalLeavesTaken} days</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover className="leave-table">
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Leave Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.leaveHistory && report.leaveHistory.length > 0 ? (
                    report.leaveHistory.map((leave, idx) => (
                      <tr key={idx}>
                        <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td>
                          <Badge bg={
                            leave.leaveType === 'SICK' ? 'danger' :
                            leave.leaveType === 'VACATION' ? 'success' :
                            'info'
                          }>
                            {leave.leaveType}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={
                            leave.status === 'APPROVED' ? 'success' :
                            leave.status === 'REJECTED' ? 'danger' :
                            'warning'
                          }>
                            {leave.status || 'PENDING'}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-muted">
                        No leave history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default LeaveReport;