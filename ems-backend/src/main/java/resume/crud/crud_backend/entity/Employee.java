package resume.crud.crud_backend.entity;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "employees")
public class Employee {
    @Id
    private ObjectId id;
    private String firstName;
    private String lastName;

    @Indexed(unique = true)
    private String email;
    private String department;
    private String contactNumber;

}
