package weblab4.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Owner {
    //todo: add tokens and authorization name
    @Id
    @Column(name = "userSessionId", nullable = false)
    private String sessionId;
    @JsonIgnore
    //if we want to drop all attempts after owner death
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attempt> attemptList;

    public static Owner initOwner(){
        Owner owner = new Owner();
        owner.setAttemptList(new ArrayList<>());
        return owner;
    }

    @Override
    public String toString() {
        return "Owner{" +
                "sessionId=" + sessionId +
                ", attemptsIds=" + attemptList.stream().map(attempt -> attempt.getId().toString() + ", ") +
                '}';
    }
}
