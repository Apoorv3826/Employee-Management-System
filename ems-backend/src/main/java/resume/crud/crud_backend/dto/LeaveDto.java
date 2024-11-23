package resume.crud.crud_backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveDto {
    private String id;
    private String employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String leaveType;
    private String status;
    private String reason;
    private int totalDays;
}
