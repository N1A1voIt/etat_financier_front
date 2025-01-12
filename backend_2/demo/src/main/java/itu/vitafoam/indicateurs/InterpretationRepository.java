package itu.vitafoam.indicateurs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterpretationRepository extends JpaRepository<Interpretation, String> {
}
