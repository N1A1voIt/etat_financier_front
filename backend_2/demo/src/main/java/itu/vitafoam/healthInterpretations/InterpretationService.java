package itu.vitafoam.healthInterpretations;

import com.fasterxml.jackson.databind.ObjectMapper;
import itu.vitafoam.aiCall.AiService;
import itu.vitafoam.compte_resultat.VueCompteResultatTranspose;
import itu.vitafoam.compte_resultat.VueCompteResultatTransposeRepository;
import itu.vitafoam.indicateurs.Interpretation;
import itu.vitafoam.indicateurs.InterpretationIndicatorService;
import itu.vitafoam.rubrique.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InterpretationService {
    @Autowired
    AiService aiService;
    @Autowired
    RubriqueService rubriqueService;
    @Autowired
    RubriqueCplRepository rubriqueRepository;
    @Autowired
    VueCompteResultatTransposeRepository vueCompteResultatTransposeRepository;
    @Autowired
    InterpretationIndicatorService interpretationIndicatorService;
    public String interprete() throws Exception{
        List<RubriqueCpl> bilan = buildTree(rubriqueRepository.findAll());
        ObjectMapper objectMapper = new ObjectMapper();
        String bilans = objectMapper.writeValueAsString(bilan);
        String query = Interpretation.toString(interpretationIndicatorService.getAllInterpretations());
        List<VueCompteResultatTranspose> vueCompteResultatTransposes = vueCompteResultatTransposeRepository.findAll();
        String incomeStatement = objectMapper.writeValueAsString(vueCompteResultatTransposes);
        return aiService.queryChatbot2(query,bilans,incomeStatement).replace("```json","").replace("```","");
    }

    public static List<RubriqueCpl> buildTree(List<RubriqueCpl> rubriques) {
        Map<Long, RubriqueCpl> rubriqueMap = new HashMap<>();
        List<RubriqueCpl> rootRubriques = new ArrayList<>();

        for (RubriqueCpl rubrique : rubriques) {
            rubrique.setChildren(new ArrayList<>());
            if (rubrique.getIdRubrique() != null) {
                rubriqueMap.put(rubrique.getIdRubrique(), rubrique);
            }
        }

        for (RubriqueCpl rubrique : rubriques) {
            if (rubrique.getIdRubriqueMere() != null) {
                RubriqueCpl parent = rubriqueMap.get(rubrique.getIdRubriqueMere());
                if (parent != null) {
                    parent.getChildren().add(rubrique);
                } else {
                    System.err.println("Parent rubrique with ID " + rubrique.getIdRubriqueMere() + " not found.");
                }
            } else {
                rootRubriques.add(rubrique);
            }
        }
        return rootRubriques;
    }
}
