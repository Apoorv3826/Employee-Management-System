package resume.crud.crud_backend.service;

import org.bson.types.ObjectId;
import resume.crud.crud_backend.dto.LeaveDto;
import resume.crud.crud_backend.entity.Leave;

import java.util.List;
import java.util.Map;

public interface LeaveService {
    LeaveDto createLeave(LeaveDto leaveDto);
    List<LeaveDto> getLeavesByEmployeeId(ObjectId employeeId);
    Map<String, Object> generateLeaveReport(ObjectId employeeId);
    List<Map<String, Object>> generateAllLeaveReports();
}
