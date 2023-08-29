package Telefonkonyv;

import Telefonkonyv.DataJPA.Address;
import Telefonkonyv.DataJPA.Contacts;
import Telefonkonyv.DataJPA.Owner;
import Telefonkonyv.Repositories.AddressRepository;
import Telefonkonyv.Repositories.ContactRepository;
import Telefonkonyv.Repositories.OwnerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {
    private final ContactRepository contactRepository;
    private final AddressRepository addressRepository;
    private final OwnerRepository ownerRepository;

    public Controller(ContactRepository contactRepository, AddressRepository addressRepository, OwnerRepository ownerRepository) {
        this.contactRepository = contactRepository;
        this.addressRepository=addressRepository;
        this.ownerRepository=ownerRepository;
    }

    @GetMapping("contacts/{requestedId}")
    public ResponseEntity<Contacts> getContact(@PathVariable Integer requestedId, Principal principal){
        Optional<Contacts> optContact = Optional.ofNullable(contactRepository.findByContactId(requestedId,principal.getName())); //get by id
        if (optContact.isPresent()) { // if there is a result
            Contacts contact=optContact.get();
            return ResponseEntity.ok(contact); //return ok(200) and the result
        } else { //else 404
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<Contacts>> findAll(Pageable pageable, Principal principal) { //to get back all the contacts as an array
        Page<Contacts> page = contactRepository.findByOwner(principal.getName(),
                PageRequest.of( //setting the page size
                        pageable.getPageNumber(),
                        pageable.getPageSize()
                ));
        return ResponseEntity.ok(page.getContent());
    }

    @PostMapping("/contacts/createContact")
    private ResponseEntity<Void> createContact(@RequestBody Contacts newContact, UriComponentsBuilder ucb, Principal principal) { //the body contains the new object
        Address address=newContact.getAddress(); //if the new contact has an address
        if (address!=null){
            addressRepository.save(address);
            newContact.setAddress(address); //we need to set it before save
        }
        Owner principalOwner = ownerRepository.findIdByEmail(principal.getName()); //!!!! adding just to our user
        newContact.setOwner(principalOwner);
        Contacts addContact = contactRepository.save(newContact); //save the new object
        URI locationOfNewContact = ucb.path("contacts/{id}").buildAndExpand(addContact.getId()).toUri(); //get the location of the new object
        return ResponseEntity.created(locationOfNewContact).build(); //created response(201) and return the location of the new contact
    }

    @PostMapping("/createOwner")
        private ResponseEntity<Void> createOwner(@RequestBody Owner newOwner, UriComponentsBuilder ucb) { //the body contains the new object
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            newOwner.setPassword(passwordEncoder.encode((newOwner.getPassword())));
            Owner saveOwner= ownerRepository.save(newOwner);
            URI locationOfNewOwner = ucb.path("contacts/{id}").buildAndExpand(saveOwner.getId()).toUri(); //get the location of the new object
            return ResponseEntity.created(locationOfNewOwner).build(); //created response(201) and return the location of the new contact
    }

    @PutMapping("/contacts/{requestedId}")
    private ResponseEntity<Void> putContact(@PathVariable Integer requestedId, @RequestBody Contacts contactUpdate, Principal principal) {
        Optional<Contacts> optContact = Optional.ofNullable(contactRepository.findByContactId(requestedId, principal.getName()));
        if (optContact.isPresent()) {
            Contacts contact=optContact.get();
            Address address=contactUpdate.getAddress();
            if (address!=null) {
                addressRepository.save(address);
                contact.setAddress(address);
            }
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

    @DeleteMapping("/contacts/{id}")
    private ResponseEntity<Void> deleteContact(@PathVariable Integer id, Principal principal) {
        Optional<Contacts> optContact = Optional.ofNullable(contactRepository.findByContactId(id, principal.getName()));
        if (optContact.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        else{
            contactRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }
}
