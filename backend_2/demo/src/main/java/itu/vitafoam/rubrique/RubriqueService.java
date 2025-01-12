package itu.vitafoam.rubrique;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RubriqueService {
    @Autowired
    RubriqueRepository rubriqueRepository;
    @Autowired
    RubriqueCplRepository rubriqueCplRepository;
    public BilanResponse getBilan(){
        BilanResponse bilanResponse = new BilanResponse();
        List<RubriqueCpl> rubriqueCpls = rubriqueCplRepository.findAll();
        if (estEquilbree(rubriqueCpls)) {
            bilanResponse.setRubriques(rubriqueCpls);
            bilanResponse.setEstEquilibre(true);
        }else{
            bilanResponse.setRubriques(null);
            bilanResponse.setEstEquilibre(false);
        }
        return bilanResponse;
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
        for (int i = 0; i < actifs.size(); i++) {
            if (passifs.get(i).getMontant() == null) continue;
            sumPassifs += passifs.get(i).getMontant().doubleValue();
        }
        return sumActifs == sumPassifs;
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
}