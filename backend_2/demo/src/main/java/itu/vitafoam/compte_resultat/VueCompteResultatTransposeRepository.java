package itu.vitafoam.compte_resultat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VueCompteResultatTransposeRepository extends JpaRepository<VueCompteResultatTranspose, Long> {
}