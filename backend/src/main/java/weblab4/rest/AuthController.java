package weblab4.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import weblab4.entitiesDTO.OwnerDTO;
import weblab4.services.AuthorizationService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthorizationService authorizationService;

    public AuthController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

//    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public String login(@RequestBody OwnerDTO owner) {
//        return authorizationService.login(owner);
//    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String registration(@RequestBody OwnerDTO owner) {
        return authorizationService.register(owner);
    }

}