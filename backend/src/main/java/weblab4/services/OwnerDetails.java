package weblab4.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import weblab4.entities.Owner;
import weblab4.exceptions.OwnerNotFoundException;

@Service
@RequiredArgsConstructor
public class OwnerDetails implements UserDetailsService {

    private final OwnerService service;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        final Owner owner = service.getOwner(login);

        if (owner == null) {
            throw new OwnerNotFoundException(login);
        }

        return User
                .withUsername(login)
                .password(owner.getPassword())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }

}
