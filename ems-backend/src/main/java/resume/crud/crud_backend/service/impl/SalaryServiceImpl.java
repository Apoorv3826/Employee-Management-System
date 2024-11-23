package resume.crud.crud_backend.service.impl;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import resume.crud.crud_backend.dto.SalaryDto;
import resume.crud.crud_backend.entity.Employee;
import resume.crud.crud_backend.entity.Salary;
import resume.crud.crud_backend.mapper.SalaryMapper;
import resume.crud.crud_backend.repository.EmployeeRepository;
import resume.crud.crud_backend.repository.SalaryRepository;
import resume.crud.crud_backend.service.SalaryService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class SalaryServiceImpl implements SalaryService {
    private final SalaryRepository salaryRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public SalaryDto createSalary(SalaryDto salaryDto) {
        Salary salary = SalaryMapper.toEntity(salaryDto);
        salary.setNetSalary(calculateNetSalary(salary));
        Salary savedSalary = salaryRepository.save(salary);
        return SalaryMapper.toDto(savedSalary);
    }

    @Override
    public List<SalaryDto> getSalariesByEmployeeId(ObjectId employeeId) {
        List<Salary> salaries = salaryRepository.findByEmployeeId(employeeId);
        return salaries.stream().map(SalaryMapper::toDto).toList();
    }

    @Override
    public Map<String, Object> generateSalaryReport(ObjectId employeeId) {
        List<Salary> salaries = salaryRepository.findByEmployeeId(employeeId);
        double totalEarnings = salaries.stream().mapToDouble(Salary::getNetSalary).sum();

        Map<String, Object> report = new HashMap<>();
        report.put("employeeId", employeeId.toHexString());
        report.put("totalEarnings", totalEarnings);
        report.put("salaryHistory", salaries.stream().map(SalaryMapper::toDto).toList());

        return report;
    }

    @Override
    public List<Map<String, Object>> generateAllSalaryReports() {
        List<Employee> employees = employeeRepository.findAll();
        List<Map<String, Object>> allReports = new ArrayList<>();

        // Generate a salary report for each employee
        for (Employee employee : employees) {
            ObjectId employeeId = employee.getId();
            Map<String, Object> report = generateSalaryReport(employeeId);
            allReports.add(report);
        }
        return allReports;
    }

    private double calculateNetSalary(Salary salary) {
        return salary.getBasicSalary() + salary.getAllowances() - salary.getDeductions();
    }
}
