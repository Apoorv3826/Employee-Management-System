package resume.crud.crud_backend.controller;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resume.crud.crud_backend.dto.LeaveDto;
import resume.crud.crud_backend.entity.Leave;
import resume.crud.crud_backend.service.LeaveService;

import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/leaves")
@AllArgsConstructor
public class LeaveController {
    private final LeaveService leaveService;

    @PostMapping
    public ResponseEntity<LeaveDto> createLeave(@RequestBody LeaveDto leaveDto) {
        LeaveDto createdLeave = leaveService.createLeave(leaveDto);
        return ResponseEntity.ok(createdLeave);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveDto>> getEmployeeLeaves(@PathVariable String employeeId) {
        ObjectId employeeObjectId = new ObjectId(employeeId);
        List<LeaveDto> leaves = leaveService.getLeavesByEmployeeId(employeeObjectId);
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/report/{employeeId}")
    public ResponseEntity<Map<String, Object>> getLeaveReport(@PathVariable String employeeId) {
        ObjectId employeeObjectId = new ObjectId(employeeId);
        Map<String, Object> report = leaveService.generateLeaveReport(employeeObjectId);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/report")
    public ResponseEntity<List<Map<String, Object>>> getAllLeaveReports() {
        List<Map<String, Object>> reports = leaveService.generateAllLeaveReports();
        return ResponseEntity.ok(reports);
    }

}
