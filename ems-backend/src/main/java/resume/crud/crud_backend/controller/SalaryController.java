package resume.crud.crud_backend.controller;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resume.crud.crud_backend.dto.SalaryDto;
import resume.crud.crud_backend.service.SalaryService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/salaries")
@AllArgsConstructor
@CrossOrigin("*")
public class SalaryController {

    private final SalaryService salaryService;

    // Create a new Salary entry
    @PostMapping
    public ResponseEntity<SalaryDto> createSalary(@RequestBody SalaryDto salaryDto) {
        SalaryDto createdSalary = salaryService.createSalary(salaryDto);
        return ResponseEntity.ok(createdSalary);
    }

    // Get all salaries of a specific employee using ObjectId
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<SalaryDto>> getEmployeeSalaries(@PathVariable String employeeId) {
        ObjectId employeeObjectId = new ObjectId(employeeId); // Convert string to ObjectId
        List<SalaryDto> salaries = salaryService.getSalariesByEmployeeId(employeeObjectId);
        return ResponseEntity.ok(salaries);
    }

    // Generate a salary report for a specific employee using ObjectId
    @GetMapping("/report/{employeeId}")
    public ResponseEntity<Map<String, Object>> getSalaryReport(@PathVariable String employeeId) {
        ObjectId employeeObjectId = new ObjectId(employeeId);
        Map<String, Object> report = salaryService.generateSalaryReport(employeeObjectId);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/report")
    public ResponseEntity<List<Map<String, Object>>> getAllSalaryReports() {
        List<Map<String, Object>> reports = salaryService.generateAllSalaryReports();
        return ResponseEntity.ok(reports);
    }
}
