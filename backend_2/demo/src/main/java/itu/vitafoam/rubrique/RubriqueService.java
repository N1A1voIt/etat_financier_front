package itu.vitafoam.rubrique;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class RubriqueService {
    @Autowired
    RubriqueRepository rubriqueRepository;
    @Autowired
    EntityManager entityManager;
    @Autowired
    RubriqueCplRepository rubriqueCplRepository;

    public BilanResponse getBilan(){
        BilanResponse bilanResponse = new BilanResponse();
        List<RubriqueCpl> actifs = rubriqueCplRepository.findByEstActif(true);
        List<RubriqueCpl> passifs = rubriqueCplRepository.findByEstActif(false);
        RubriqueCpl rubriqueCpl = getRubriqueCpl(passifs);
        passifs.add(rubriqueCpl);
        if (estEquilbree(rubriqueCplRepository.findAll())) {
            bilanResponse.setActifs(actifs);
            bilanResponse.setPassifs(passifs);
            bilanResponse.setEstEquilibre(true);
        }else{
            bilanResponse.setActifs(actifs);
            bilanResponse.setPassifs(passifs);
            bilanResponse.setEstEquilibre(false);
        }
        return bilanResponse;
    }

    private RubriqueCpl getRubriqueCpl(List<RubriqueCpl> passifs) {
        RubriqueCpl rubriqueCpl = new RubriqueCpl();
        rubriqueCpl.setIdRubrique(1000000L);
        rubriqueCpl.setEstActif(false);
        rubriqueCpl.setMontant(getResultatNet().get(0).getMontant());
        rubriqueCpl.setIdType(5L);
        rubriqueCpl.setRubrique("Résultat net");
        Long idMere = 1L;
        passifs.sort(Comparator.comparing(RubriqueCpl::getIdRubrique).reversed());
        for (int i = 0; i < passifs.size(); i++) {
            if (passifs.get(i).getIdType() == 5L) idMere = passifs.get(i).getIdRubrique();
        }
        passifs.sort(Comparator.comparing(RubriqueCpl::getIdRubrique));
        rubriqueCpl.setIdRubriqueMere(idMere);
        return rubriqueCpl;
    }

    private boolean estEquilbree(List<RubriqueCpl> rubriqueList){
        List<RubriqueCpl> actifs = getActifs(rubriqueList);
        List<RubriqueCpl> passifs = getPassifs(rubriqueList);
        double sumActifs = 0;
        double sumPassifs = 0;
        for (int i = 0; i < actifs.size(); i++) {
            if (actifs.get(i).getMontant() == null) continue;
            sumActifs += actifs.get(i).getMontant().doubleValue();
        }
        for (int i = 0; i < passifs.size(); i++) {
            if (passifs.get(i).getMontant() == null) continue;
            sumPassifs += passifs.get(i).getMontant().doubleValue();
        }
        return sumActifs == sumPassifs+getResultatNet().get(0).getMontant().doubleValue();
    }
    private List<RubriqueCpl> getActifs(List<RubriqueCpl> rubriques){
        List<RubriqueCpl> actifs = new ArrayList<>();
        for (int i = 0; i < rubriques.size(); i++) {
            if (rubriques.get(i).getEstActif()) actifs.add(rubriques.get(i));
        }
        return actifs;
    }
    private List<RubriqueCpl> getPassifs(List<RubriqueCpl> rubriques){
        List<RubriqueCpl> actifs = new ArrayList<>();
        for (int i = 0; i < rubriques.size(); i++) {
            if (!rubriques.get(i).getEstActif()) actifs.add(rubriques.get(i));
        }
        return actifs;
    }
    private List<SpecialAmount> getResultatNet(){
        Query query = entityManager.createNativeQuery("SELECT montant FROM resultat_net", SpecialAmount.class);
        List<SpecialAmount> specialAmounts = query.getResultList();
        return specialAmounts;
    }
}