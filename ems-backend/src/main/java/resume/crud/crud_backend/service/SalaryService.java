package resume.crud.crud_backend.service;

import org.bson.types.ObjectId;
import resume.crud.crud_backend.dto.SalaryDto;

import java.util.List;
import java.util.Map;

public interface SalaryService {
    SalaryDto createSalary(SalaryDto salaryDto);
    List<SalaryDto> getSalariesByEmployeeId(ObjectId employeeId);
    Map<String, Object> generateSalaryReport(ObjectId employeeId);

    List<Map<String, Object>> generateAllSalaryReports();
}
