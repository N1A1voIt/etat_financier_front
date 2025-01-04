package itu.vitafoam.actif.actifRepositories;

import itu.vitafoam.actif.ActifImmobilise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActifImmobiliseRepository extends JpaRepository<ActifImmobilise, Long> {
    @Query("SELECT ai FROM ActifImmobilise ai WHERE ai.idBilan = :idBilan")
    List<ActifImmobilise> findByBilan(Long idBilan);
}
