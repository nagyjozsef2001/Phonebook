package Telefonkonyv;

import Telefonkonyv.DataJPA.Contacts;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
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
        Iterable<Contacts> asd=contactRepository.findAll();
        Optional<Contacts> optContact = contactRepository.findById(requestedId);
        if (optContact.isPresent()) {
            Contacts contact=optContact.get();
            return ResponseEntity.ok(contact);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    private ResponseEntity<Void> createContact(@RequestBody Contacts newContact, UriComponentsBuilder ucb) {
        Contacts addContact = contactRepository.save(newContact);
        URI locationOfNewContact = ucb.path("contacts/{id}").buildAndExpand(addContact.getAddress()).toUri();
        return ResponseEntity.created(locationOfNewContact).build();
    }
}
