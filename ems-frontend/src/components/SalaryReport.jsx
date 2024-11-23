import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
import { FaMoneyBillWave, FaUser, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const SalaryReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalaryReports = async () => {
      try {
        const response = await fetch('https://crud-tqis.onrender.com/api/salaries/report');
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error('Error fetching salary reports:', error);
      }
      setLoading(false);
    };

    fetchSalaryReports();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getMonthName = (month) => {
    return new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Loading salary reports...</p>
      </div>
    );
  }

  return (
    <Container fluid className="salary-reports-container">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="page-title">
              <FaMoneyBillWave className="title-icon" />
              Salary Reports
            </h1>
            <Badge bg="primary" className="total-badge">
              Total Reports: {reports.length}
            </Badge>
          </div>
        </Col>
      </Row>

      {reports.map((report, index) => (
        <Card key={index} className="salary-card">
          <Card.Header className="salary-card-header">
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="employee-title">
                  <FaUser className="me-2" />
                  Employee Details
                </h2>
                <div className="employee-id">ID: {report.employeeId}</div>
              </Col>
              <Col md={6} className="text-md-end">
                <div className="earnings-container">
                  <FaChartLine className="earnings-icon" />
                  <div>
                    <div className="earnings-label">Total Earnings</div>
                    <div className="earnings-amount">{formatCurrency(report.totalEarnings)}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover className="salary-table">
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>
                      <FaCalendarAlt className="me-2" />
                      Month
                    </th>
                    <th style={{ width: '100px' }}>Year</th>
                    <th className="text-end">Basic Salary</th>
                    <th className="text-end">Allowances</th>
                    <th className="text-end">Deductions</th>
                    <th className="text-end">Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {report.salaryHistory.map((salary, idx) => (
                    <tr key={idx}>
                      <td>{getMonthName(salary.month)}</td>
                      <td>{salary.year}</td>
                      <td className="amount-cell">{formatCurrency(salary.basicSalary)}</td>
                      <td className="amount-cell positive">{formatCurrency(salary.allowances)}</td>
                      <td className="amount-cell negative">{formatCurrency(salary.deductions)}</td>
                      <td className="amount-cell total">{formatCurrency(salary.netSalary)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default SalaryReport;