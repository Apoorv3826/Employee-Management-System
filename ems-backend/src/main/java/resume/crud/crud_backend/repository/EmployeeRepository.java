package resume.crud.crud_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import resume.crud.crud_backend.entity.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, ObjectId> {

}
