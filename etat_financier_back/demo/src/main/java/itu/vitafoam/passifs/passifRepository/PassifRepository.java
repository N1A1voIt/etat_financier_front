package itu.vitafoam.passifs.passifRepository;

import itu.vitafoam.passifs.Passif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassifRepository extends JpaRepository<Passif, Long> {
}
