package Telefonkonyv;


import Telefonkonyv.DataJPA.Contacts;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ContactRepository extends CrudRepository<Contacts, String>, PagingAndSortingRepository<Contacts, String> {
}
