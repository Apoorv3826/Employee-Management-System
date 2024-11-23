package resume.crud.crud_backend.mapper;

import org.bson.types.ObjectId;
import resume.crud.crud_backend.dto.SalaryDto;
import resume.crud.crud_backend.entity.Salary;

public class SalaryMapper {
    public static SalaryDto toDto(Salary salary) {
        SalaryDto dto = new SalaryDto();
        dto.setId(salary.getId() != null ? salary.getId().toHexString() : null);
        dto.setEmployeeId(salary.getEmployeeId() != null ? salary.getEmployeeId().toHexString() : null);
        dto.setBasicSalary(salary.getBasicSalary());
        dto.setAllowances(salary.getAllowances());
        dto.setDeductions(salary.getDeductions());
        dto.setPaymentDate(salary.getPaymentDate());
        dto.setMonth(salary.getMonth());
        dto.setYear(salary.getYear());
        dto.setNetSalary(salary.getNetSalary());
        return dto;
    }

    public static Salary toEntity(SalaryDto dto) {
        Salary salary = new Salary();
        salary.setId(dto.getId() != null ? new ObjectId(dto.getId()) : null);
        salary.setEmployeeId(dto.getEmployeeId() != null ? new ObjectId(dto.getEmployeeId()) : null);
        salary.setBasicSalary(dto.getBasicSalary());
        salary.setAllowances(dto.getAllowances());
        salary.setDeductions(dto.getDeductions());
        salary.setPaymentDate(dto.getPaymentDate());
        salary.setMonth(dto.getMonth());
        salary.setYear(dto.getYear());
        salary.setNetSalary(dto.getNetSalary());
        return salary;
    }
}
