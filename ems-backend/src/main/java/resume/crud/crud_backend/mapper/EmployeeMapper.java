package resume.crud.crud_backend.mapper;

import org.bson.types.ObjectId;
import resume.crud.crud_backend.dto.EmployeeDto;
import resume.crud.crud_backend.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId() != null ? employee.getId().toString() : null,
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment(),
                employee.getContactNumber()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId() != null ? new ObjectId(employeeDto.getId()) : null,
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                employeeDto.getDepartment(),
                employeeDto.getContactNumber()
        );
    }
}
