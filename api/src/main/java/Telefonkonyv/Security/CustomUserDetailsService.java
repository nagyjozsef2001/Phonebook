package Telefonkonyv.Security;

import Telefonkonyv.DataJPA.Owner;
import Telefonkonyv.Repositories.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    OwnerRepository ownerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Owner owner=ownerRepository.findIdByEmail(username);
        System.out.println(owner.toString());
        return new CustomUserDetails(owner);
    }
}
