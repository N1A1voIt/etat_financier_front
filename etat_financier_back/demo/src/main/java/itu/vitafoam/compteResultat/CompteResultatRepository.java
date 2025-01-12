package itu.vitafoam.compteResultat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompteResultatRepository extends JpaRepository<CompteResultat, Long> {
    Optional<CompteResultat> findByIdEntrepriseAndIdAnnee(Long idEntreprise,Long idAnnee);
}