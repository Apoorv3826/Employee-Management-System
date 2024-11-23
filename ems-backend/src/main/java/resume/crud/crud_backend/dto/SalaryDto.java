package resume.crud.crud_backend.dto;

import lombok.Data;

import java.time.LocalDate;
@Data
public class SalaryDto {
    private String id;
    private String employeeId;
    private double basicSalary;
    private double allowances;
    private double deductions;
    private LocalDate paymentDate;
    private String month;
    private int year;
    private double netSalary;
}
