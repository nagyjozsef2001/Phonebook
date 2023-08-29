package Telefonkonyv.Repositories;

import Telefonkonyv.DataJPA.Owner;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface OwnerRepository extends CrudRepository<Owner, Integer> {
    @Query("SELECT o FROM Owner o WHERE o.email = :email")
    Owner findIdByEmail(String email);
}
