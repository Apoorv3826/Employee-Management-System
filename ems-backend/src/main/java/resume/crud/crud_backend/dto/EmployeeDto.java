package resume.crud.crud_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "employees")
public class EmployeeDto {
        private String id;
        private String firstName;
        private String lastName;
        private String email;
        private String department;
        private String contactNumber;
}
