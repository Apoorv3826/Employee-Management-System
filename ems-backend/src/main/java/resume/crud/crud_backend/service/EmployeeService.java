package resume.crud.crud_backend.service;

import org.bson.types.ObjectId;
import resume.crud.crud_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(ObjectId employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(ObjectId employeeId, EmployeeDto updateEmployee);
    void deleteEmployee(ObjectId employeeId);
}
