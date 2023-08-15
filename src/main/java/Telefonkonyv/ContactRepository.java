package Telefonkonyv;


import Telefonkonyv.DataJPA.Contacts;
import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contacts, String> {
}
