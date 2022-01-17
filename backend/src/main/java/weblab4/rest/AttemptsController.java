package weblab4.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import weblab4.entities.Attempt;
import weblab4.services.AttemptsService;

import java.util.List;

@RestController
public class AttemptsController {

    private final AttemptsService service;


    @Autowired
    public AttemptsController(AttemptsService service) {
        this.service = service;
    }

    @GetMapping("/attempts")
    List<Attempt> getAllAttempts() {
        return service.getAllAttempts(getCurrentOwnerLogin());
    }

    @PostMapping("/attempts")
     Attempt addAttempt(@RequestBody Attempt newAttempt) {
        return service.addAttempt(getCurrentOwnerLogin(), newAttempt);
    }

    @DeleteMapping("/attempts")
    void deleteAllAttempt() {
        service.deleteAllAttempts(getCurrentOwnerLogin());
    }

    private String getCurrentOwnerLogin(){
        return "marsen"; //todo
    }
}