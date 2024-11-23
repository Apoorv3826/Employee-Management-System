package resume.crud.crud_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import resume.crud.crud_backend.entity.Leave;

import java.util.List;

public interface LeaveRepository extends MongoRepository<Leave, ObjectId> {
    List<Leave> findByEmployeeId(ObjectId employeeId);
}
