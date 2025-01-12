package itu.vitafoam.rubrique;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RubriqueCplRepository extends JpaRepository<RubriqueCpl,Long> {
    List<RubriqueCpl> findByEstActif(Boolean estActif);
}
