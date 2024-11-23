package resume.crud.crud_backend.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Document(collection = "leaves")
public class Leave {
    @Id
    private ObjectId id;
    private ObjectId employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String leaveType; // e.g., "SICK", "VACATION", "PERSONAL"
    private String status; // e.g., "PENDING", "APPROVED", "REJECTED"
    private String reason;
    private int totalDays;

    public void calculateTotalDays() {
        if (startDate != null && endDate != null) {
            this.totalDays = (int) ChronoUnit.DAYS.between(startDate, endDate) + 1; // Include both start and end date
        }
    }
}
