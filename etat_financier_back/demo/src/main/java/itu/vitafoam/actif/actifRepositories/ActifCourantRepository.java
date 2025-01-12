package itu.vitafoam.actif.actifRepositories;

import itu.vitafoam.actif.ActifCourant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActifCourantRepository extends JpaRepository<ActifCourant, Long> {
    @Query("SELECT ac FROM ActifCourant ac WHERE ac.idBilan = :idBilan")
    List<ActifCourant> findByBilan(Long idBilan);
}
