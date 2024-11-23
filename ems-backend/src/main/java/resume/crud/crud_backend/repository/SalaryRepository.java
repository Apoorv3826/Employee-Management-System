package resume.crud.crud_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import resume.crud.crud_backend.entity.Salary;


import java.util.List;

public interface SalaryRepository extends MongoRepository<Salary, ObjectId> {
    List<Salary> findByEmployeeId(ObjectId employeeId);
}