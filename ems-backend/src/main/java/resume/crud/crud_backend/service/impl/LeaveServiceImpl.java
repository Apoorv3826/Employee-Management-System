package resume.crud.crud_backend.service.impl;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import resume.crud.crud_backend.dto.LeaveDto;
import resume.crud.crud_backend.entity.Employee;
import resume.crud.crud_backend.entity.Leave;
import resume.crud.crud_backend.mapper.LeaveMapper;
import resume.crud.crud_backend.repository.EmployeeRepository;
import resume.crud.crud_backend.repository.LeaveRepository;
import resume.crud.crud_backend.service.LeaveService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {
    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public LeaveDto createLeave(LeaveDto leaveDto) {
        Leave leave = LeaveMapper.toEntity(leaveDto);
        leave.setEmployeeId(new ObjectId(leaveDto.getEmployeeId()));
        leave.calculateTotalDays();
        Leave savedLeave = leaveRepository.save(leave);
        return LeaveMapper.toDto(savedLeave);
    }

    @Override
    public List<LeaveDto> getLeavesByEmployeeId(ObjectId employeeId) {
        List<Leave> leaves = leaveRepository.findByEmployeeId(employeeId);
        return leaves.stream()
                .map(LeaveMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> generateLeaveReport(ObjectId employeeId) {
        List<Leave> leaves = leaveRepository.findByEmployeeId(employeeId);
        int totalLeavesTaken = leaves.stream().mapToInt(Leave::getTotalDays).sum();

        Map<String, Object> report = new HashMap<>();
        report.put("employeeId", employeeId.toString());
        report.put("totalLeavesTaken", totalLeavesTaken);
        report.put("leaveHistory", leaves.stream()
                .map(LeaveMapper::toDto)
                .collect(Collectors.toList()));
        return report;
    }

    // In LeaveServiceImpl.java
    @Override
    public List<Map<String, Object>> generateAllLeaveReports() {
        // Fetch all employees from the EmployeeRepository
        List<Employee> employees = employeeRepository.findAll(); // Assuming EmployeeRepository exists

        List<Map<String, Object>> reports = new ArrayList<>();

        // Generate leave report for each employee
        for (Employee employee : employees) {
            Map<String, Object> report = generateLeaveReport(employee.getId());
            reports.add(report);
        }

        return reports;
    }


}
