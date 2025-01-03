package itu.vitafoam.passifs.passifRepository;

import itu.vitafoam.passifs.CapitauxPropres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapitauxPropresRepository extends JpaRepository<CapitauxPropres, Long> {
}
