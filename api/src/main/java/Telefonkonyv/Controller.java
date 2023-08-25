package Telefonkonyv;

import Telefonkonyv.DataJPA.Contacts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/contacts")
public class Controller {
    private final ContactRepository contactRepository;

    public Controller(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping("/{requestedId}")
    public ResponseEntity<Contacts> getContact(@PathVariable Integer requestedId){
        Optional<Contacts> optContact = contactRepository.findById(requestedId); //get by id
        if (optContact.isPresent()) { // if there is a result
            Contacts contact=optContact.get();
            return ResponseEntity.ok(contact); //return ok(200) and the result
        } else { //else 404
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Contacts>> findAll(Pageable pageable) {
        Page<Contacts> page = contactRepository.findAll(
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize()/*,
                        pageable.getSortOr(Sort.by(Sort.Direction.ASC, "amount"))*/
                ));
        return ResponseEntity.ok(page.getContent());
    }

    @PostMapping
    private ResponseEntity<Void> createContact(@RequestBody Contacts newContact, UriComponentsBuilder ucb) { //the body contains the new object
        Contacts addContact = contactRepository.save(newContact); //save the new object
        URI locationOfNewContact = ucb.path("contacts/{id}").buildAndExpand(addContact.getAddress()).toUri(); //get the location of the new object
        return ResponseEntity.created(locationOfNewContact).build(); //created response(201) and return the location of the new contact
    }

    @PutMapping("/{requestedId}")
    private ResponseEntity<Void> putContact(@PathVariable Integer requestedId, @RequestBody Contacts contactUpdate) {
        Optional<Contacts> optContact = contactRepository.findById(requestedId);
        if (optContact.isPresent()) {
            Contacts contact=optContact.get();
            contact.setPhoneNumber(contactUpdate.getPhoneNumber());
            contact.setEmail(contactUpdate.getEmail());
            contact.setFirstName(contactUpdate.getFirstName());
            contact.setLastName(contactUpdate.getLastName());
            contact.setNotes(contactUpdate.getNotes());
            contactRepository.save(contact);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deleteContact(@PathVariable Integer id) {
        Optional<Contacts> optContact = contactRepository.findById(id);
        if (optContact.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        else{
            contactRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }
}
