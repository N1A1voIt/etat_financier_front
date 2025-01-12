package itu.vitafoam.compte_resultat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompteResultatRepository extends JpaRepository<CompteResultat,Long> {
    public Optional<CompteResultat> findByRubrique(String rubrique);
}
