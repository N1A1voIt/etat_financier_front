package itu.vitafoam.passifs.passifRepository;

import itu.vitafoam.passifs.CapitauxPropres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CapitauxPropresRepository extends JpaRepository<CapitauxPropres, Long> {
    @Query("SELECT c FROM CapitauxPropres c WHERE c.idBilan = :idBilan")
    List<CapitauxPropres> findByBilan(Long idBilan);
}
