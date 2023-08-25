package Telefonkonyv;

import Telefonkonyv.DataJPA.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Integer> {
}
