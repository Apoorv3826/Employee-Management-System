package resume.crud.crud_backend.mapper;

import org.bson.types.ObjectId;
import resume.crud.crud_backend.dto.LeaveDto;
import resume.crud.crud_backend.entity.Leave;

public class LeaveMapper {

    public static LeaveDto toDto(Leave leave) {
        LeaveDto dto = new LeaveDto();
        dto.setId(leave.getId().toString());
        dto.setEmployeeId(leave.getEmployeeId().toString());
        dto.setStartDate(leave.getStartDate());
        dto.setEndDate(leave.getEndDate());
        dto.setLeaveType(leave.getLeaveType());
        dto.setStatus(leave.getStatus());
        dto.setReason(leave.getReason());
        dto.setTotalDays(leave.getTotalDays());

        if (leave.getTotalDays() <= 0 && leave.getStartDate() != null && leave.getEndDate() != null) {
            leave.calculateTotalDays(); // Recalculate totalDays if not set
        }
        dto.setTotalDays(leave.getTotalDays());

        return dto;
    }

    public static Leave toEntity(LeaveDto leaveDto) {
        Leave leave = new Leave();
        leave.setId(leaveDto.getId() != null ? new ObjectId(leaveDto.getId()) : null);
        leave.setEmployeeId(new ObjectId(leaveDto.getEmployeeId()));
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setLeaveType(leaveDto.getLeaveType());
        leave.setStatus(leaveDto.getStatus());
        leave.setReason(leaveDto.getReason());
        leave.setTotalDays(leaveDto.getTotalDays());

        if (leave.getTotalDays() <= 0 && leave.getStartDate() != null && leave.getEndDate() != null) {
            leave.calculateTotalDays(); // Recalculate totalDays if not set
        }
        return leave;
    }
}
