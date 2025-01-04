package itu.vitafoam.passifs.passifRepository;

import itu.vitafoam.passifs.PassifNonCourant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassifNonCourantRepository extends JpaRepository<PassifNonCourant, Long> {
    @Query("SELECT pnc FROM PassifNonCourant pnc WHERE pnc.idBilan = :idBilan")
    List<PassifNonCourant> findByBilan(Long idBilan);
}
