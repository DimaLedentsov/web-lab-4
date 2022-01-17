package weblab4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import weblab4.AttemptsRepository;
import weblab4.entities.Attempt;
import weblab4.entities.Coordinates;
import weblab4.entities.Owner;
import weblab4.exceptions.AttemptNotFoundException;

import java.util.List;

@RestController
public class RestAttemptsController {

    private final AttemptsRepository repository;

    @Autowired
    public RestAttemptsController(AttemptsRepository repository) {
        this.repository = repository;
        addTestAttemptToBD();
    }

    private void addTestAttemptToBD() {
        Coordinates testCoordinates = new Coordinates(7, 7, 7);
        Attempt testAttempt = new Attempt(testCoordinates, true);
        Owner testOwner = Owner.initOwner();
        testOwner.setSessionId("bla-bla-session-id");
        testOwner.getAttemptList().add(testAttempt);
        testAttempt.setOwner(testOwner);
        testCoordinates.setAttempt(testAttempt);
        this.repository.save(testAttempt);
    }

    @GetMapping("/attempts")
    List<Attempt> all() {
        return repository.findAll();
    }

    @PostMapping("/attempts")
     Attempt addAttempt(@RequestBody Attempt newAttempt) {
        return repository.save(newAttempt);
    }

    // Single item
    @GetMapping("/attempts/{id}")
    Attempt getAttempt(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new AttemptNotFoundException(id));
    }

    @PutMapping("/attempts/{id}")
    Attempt replaceAttempt(@RequestBody Attempt newAttempt, @PathVariable Long id) {

        return repository.findById(id)
                .map(attempt -> {
                    attempt.setCoordinates(newAttempt.getCoordinates());
                    attempt.setDoFitArea(newAttempt.getDoFitArea());
                    attempt.setOwner(newAttempt.getOwner()); //todo:check that here we put the whole object and check if it is authorized
                    return repository.save(attempt);
                })
                .orElseGet(() -> {
                    newAttempt.setId(id);
                    return repository.save(newAttempt);
                });
    }

    @DeleteMapping("/attempts/{id}")
    void deleteAttempt(@PathVariable Long id) {
        repository.deleteById(id);
    }
}