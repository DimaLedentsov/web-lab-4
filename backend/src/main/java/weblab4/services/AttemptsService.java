package weblab4.services;

import org.springframework.stereotype.Service;
import weblab4.entities.Attempt;

import java.util.ArrayList;
import java.util.List;

@Service
public class AttemptsService {
//    private final OwnersRepository repository;
    private final OwnerService service;

    public AttemptsService(OwnerService service) {
        this.service = service;
    }

    public List<Attempt> getAllAttempts(String ownerLogin) {
        return service.getOwner(ownerLogin).getAttemptList();
    }

    public Attempt addAttempt(String ownerLogin, Attempt newAttempt) {
        //if getOwner throw exception OwnerNotFoundExp it has to be caught higher
        //because we can't add attempt to un authorized user
        service.getOwner(ownerLogin).getAttemptList().add(newAttempt);
        return newAttempt;
    }

    //todo: do i need this methods
    /*Attempt getAttempt();
    Attempt replaceAttempt(Attempt newAttempt, Long id);
    void deleteAttempt(Long id);*/

    public void deleteAllAttempts(String ownerLogin){
        service.getOwner(ownerLogin).setAttemptList(new ArrayList<>());
    }
}