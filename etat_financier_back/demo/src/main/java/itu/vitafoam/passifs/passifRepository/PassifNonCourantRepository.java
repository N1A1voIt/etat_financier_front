package itu.vitafoam.passifs.passifRepository;

import itu.vitafoam.passifs.PassifNonCourant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassifNonCourantRepository extends JpaRepository<PassifNonCourant, Long> {
}
