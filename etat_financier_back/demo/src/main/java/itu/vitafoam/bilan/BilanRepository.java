package itu.vitafoam.bilan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BilanRepository extends JpaRepository<Bilan,Long> {
    @Query("SELECT b FROM Bilan b WHERE b.annee = :annee AND b.entreprise = :entreprise")
    List<Bilan> findByAnneeEtEntreprise(Long annee, Long entreprise);
}
