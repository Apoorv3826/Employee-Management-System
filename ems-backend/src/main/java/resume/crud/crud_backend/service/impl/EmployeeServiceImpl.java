package resume.crud.crud_backend.service.impl;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import resume.crud.crud_backend.dto.EmployeeDto;
import resume.crud.crud_backend.entity.Employee;
import resume.crud.crud_backend.exception.ResourceNotFoundException;
import resume.crud.crud_backend.mapper.EmployeeMapper;
import resume.crud.crud_backend.repository.EmployeeRepository;
import resume.crud.crud_backend.service.EmployeeService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(ObjectId employeeId) {

         Employee employee =  employeeRepository.findById(employeeId)
                    .orElseThrow( ()->
                            new ResourceNotFoundException("Employee Not Exist with given id : "+ employeeId));

            return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map( (employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(ObjectId employeeId, EmployeeDto updateEmployee) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee with given id not found")
        );

        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());
        employee.setDepartment(updateEmployee.getDepartment());
        employee.setContactNumber(updateEmployee.getContactNumber());

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(ObjectId employeeId) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee with given id not found")
        );

        employeeRepository.deleteById(employeeId);

    }

}
