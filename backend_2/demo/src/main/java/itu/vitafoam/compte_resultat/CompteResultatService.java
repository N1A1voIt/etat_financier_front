package itu.vitafoam.compte_resultat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.List;

@Service
public class CompteResultatService {
    @Autowired
    CompteResultatRepository compteResultatRepository;
//    public void save(CompteResultatDTO compteResultatDTO) throws IllegalAccessException {
//        Field[] fields = compteResultatDTO.getClass().getDeclaredFields();
//        for (int i = 0; i < fields.length; i++) {
//            fields[i].setAccessible(true);
//            CompteResultat compteResultat = compteResultatRepository.findByRubrique(fields[i].getName().toUpperCase()).orElse(null);
//            compteResultat.setMontant((BigDecimal) fields[i].get(compteResultat));
//            compteResultatRepository.save(compteResultat);
//        }
//    }
//    public CompteResultatDTO getDTO() throws IllegalAccessException {
//        List<CompteResultat> compteResultats = compteResultatRepository.findAll();
//        CompteResultatDTO compteResultatDTOS = new CompteResultatDTO();
//        Field[] fields = compteResultatDTOS.getClass().getFields();
//        for (int i = 0; i < compteResultats.size(); i++) {
//            for (int j = 0; j < fields.length; j++) {
//                if (compteResultats.get(i).getRubrique().compareToIgnoreCase(fields[i].getName()) == 0) fields[i].set(compteResultatDTOS,compteResultats.get(i).getMontant());
//            }
//        }
//        return compteResultatDTOS;
//    }
}
