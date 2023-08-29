package Telefonkonyv.Repositories;


import Telefonkonyv.DataJPA.Contacts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ContactRepository extends CrudRepository<Contacts, Integer>, PagingAndSortingRepository<Contacts, Integer> {
    @Query("SELECT c FROM Contacts c WHERE c.id = :id AND c.owner.email = :owner") //custom query to get gack a contacts by owner
    Contacts findByContactId(Integer id, String owner);
    @Query("SELECT c FROM Contacts c WHERE c.owner.email= :owner") //same but for all the contacts
    Page<Contacts> findByOwner(String owner, PageRequest amount);
}
