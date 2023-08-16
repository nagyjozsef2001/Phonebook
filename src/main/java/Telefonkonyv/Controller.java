package Telefonkonyv;

import Telefonkonyv.DataJPA.Contacts;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/contacts")
public class Controller {
    private final ContactRepository contactRepository;

    public Controller(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping("/{requestedId}")
    public ResponseEntity<Contacts> getContact(@PathVariable String requestedId){
        Optional<Contacts> optContact = contactRepository.findById(requestedId); //get by id
        if (optContact.isPresent()) { // if there is a result
            Contacts contact=optContact.get();
            return ResponseEntity.ok(contact); //return ok(200) and the result
        } else { //else 404
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    private ResponseEntity<Void> createContact(@RequestBody Contacts newContact, UriComponentsBuilder ucb) { //the body contains the new object
        Contacts addContact = contactRepository.save(newContact); //save the new object
        URI locationOfNewContact = ucb.path("contacts/{id}").buildAndExpand(addContact.getAddress()).toUri(); //get the location of the new object
        return ResponseEntity.created(locationOfNewContact).build(); //created response(201) and return the location of the new contact
    }

    @PutMapping("/{requestedId}")
    private ResponseEntity<Void> putContact(@PathVariable String requestedId, @RequestBody Contacts contactUpdate) {
        Optional<Contacts> optContact = contactRepository.findById(requestedId);
        if (optContact.isPresent()) {
            Contacts contact=optContact.get();
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
    private ResponseEntity<Void> deleteContact(@PathVariable String id) {
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
