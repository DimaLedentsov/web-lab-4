package weblab4.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.java.Log;

import javax.persistence.*;
import java.util.Objects;

@Log
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Attempt {

    @OneToOne(mappedBy = "attempt", cascade = CascadeType.ALL)
    @JoinColumn(name = "coordinates", nullable = false)
    private Coordinates coordinates = new Coordinates(0.0, 0.0, 1.0); //fixme set r = 0.0

    private boolean doFitArea = true;

    @Id
    @PrimaryKeyJoinColumn
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = null;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Owner owner = null;

    public Attempt(Coordinates coordinates, boolean doFitArea) {
        this.coordinates = coordinates;
        this.doFitArea = doFitArea;
        this.owner = null;
        this.id = null;
    }

    public static Attempt initAttempt() {
        Attempt attempt = new Attempt();
        attempt.setCoordinates(new Coordinates());
        attempt.setOwner(Owner.initOwner());
        return attempt;
    }

    @Override
    public String toString() {
        return "Attempt{" +
                "coordinates: (x=" + coordinates.getX() +
                "; y=" + coordinates.getY() +
                "; r=" + coordinates.getR() +
                "), doFitArea=" + doFitArea +
                ", id=" + id +
                ", owner isn't null=" + (Objects.nonNull(owner)) +
                " " + System.currentTimeMillis() +
                '}';
    }

    public void setCoordinates(Coordinates coordinates) {
        log.info("Timestamp(setCoordinates) " + System.currentTimeMillis() + " " + coordinates.toString());
        this.coordinates = coordinates;
    }


    public boolean getDoFitArea() {
        return doFitArea;
    }
}
