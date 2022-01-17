package weblab4.rest;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import weblab4.entities.Owner;
import weblab4.services.OwnerService;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final OwnerService service;

    public AuthController(OwnerService service) {
        this.service = service;
    }

    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Owner getAuthOwner() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        Object principal = auth.getPrincipal();
        Owner owner = (principal instanceof Owner) ? (Owner) principal : null;
        return Objects.nonNull(owner) ? this.service.getOwner(owner.getLogin()) : null;
    }

}