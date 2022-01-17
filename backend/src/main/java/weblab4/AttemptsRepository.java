package weblab4;

import org.springframework.data.jpa.repository.JpaRepository;
import weblab4.entities.Attempt;

public interface AttemptsRepository extends JpaRepository<Attempt, Long> {}
