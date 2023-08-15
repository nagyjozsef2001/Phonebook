package Telefonkonyv.DataJPA;

import jakarta.persistence.*;

@Entity
@Table(name="OWNER")
public class Owner {
    @Id
    @SequenceGenerator(
            name = "owner_id_sequence",
            sequenceName = "owner_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "owner_id_sequence"
    )
    private Integer id;
    private String email;
    private String password;

    public Owner(Integer id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public Owner() {
    }

    @Override
    public String toString() {
        return "Owner{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
