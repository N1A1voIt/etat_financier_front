package itu.vitafoam.actif.actifRepositories;

import itu.vitafoam.actif.ActifImmobilise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActifImmobiliseRepository extends JpaRepository<ActifImmobilise, Long> {
}
