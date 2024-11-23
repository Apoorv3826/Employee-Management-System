package resume.crud.crud_backend.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "salaries")
public class Salary {
    @Id
    private ObjectId id; // MongoDB-generated ObjectId
    private ObjectId employeeId; // Reference to Employee
    private double basicSalary;
    private double allowances;
    private double deductions;
    private LocalDate paymentDate;
    private String month;
    private int year;
    private double netSalary;
}
