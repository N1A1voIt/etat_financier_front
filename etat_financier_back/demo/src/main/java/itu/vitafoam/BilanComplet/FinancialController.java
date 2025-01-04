package itu.vitafoam.BilanComplet;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import itu.vitafoam.FinancialItemDTO;
import itu.vitafoam.actif.ActifCourant;
import itu.vitafoam.actif.ActifImmobilise;
import itu.vitafoam.actif.actifRepositories.ActifCourantRepository;
import itu.vitafoam.actif.actifRepositories.ActifImmobiliseRepository;
import itu.vitafoam.bilan.Bilan;
import itu.vitafoam.bilan.BilanRepository;
import itu.vitafoam.passifs.CapitauxPropres;
import itu.vitafoam.passifs.Passif;
import itu.vitafoam.passifs.PassifNonCourant;
import itu.vitafoam.passifs.passifRepository.CapitauxPropresRepository;
import itu.vitafoam.passifs.passifRepository.PassifNonCourantRepository;
import itu.vitafoam.passifs.passifRepository.PassifRepository;

@RestController
@RequestMapping("/api")
public class FinancialController {

    @Autowired
    private CapitauxPropresRepository capitauxPropresRepository;

    @Autowired
    private PassifRepository passifRepository;

    @Autowired
    private PassifNonCourantRepository passifNonCourantRepository;

    @Autowired
    private ActifCourantRepository actifCourantRepository;

    @Autowired
    private ActifImmobiliseRepository actifImmobiliseRepository;

    @Autowired
    private BilanRepository bilanRepository;
    
    @GetMapping("/bilan")
    public Map<String, List<FinancialItemDTO>> getBilan(@RequestParam Long annee, @RequestParam Long entreprise) {
        Map<String, List<FinancialItemDTO>> bilan = new HashMap<>();

        List<Bilan> b = (List<Bilan>) bilanRepository.findByAnneeEtEntreprise(annee, entreprise);

        if (b == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bilan non trouvé pour l'année et l'entreprise spécifiées.");
        }

        Long idBilan = b.get(0).getIdBilan();

        List<FinancialItemDTO> capitauxPropresDTO = ((List<CapitauxPropres>) capitauxPropresRepository.findByBilan(idBilan)).stream()
                .map(c -> new FinancialItemDTO("Capital Social", c.getCapitalSocial()))
                .collect(Collectors.toList());
        bilan.put("CapitauxPropres", capitauxPropresDTO);

        List<FinancialItemDTO> passifDTO = ((List<Passif>) passifRepository.findByBilan(idBilan)).stream()
                .map(p -> new FinancialItemDTO("Dettes Fournisseurs", p.getDettesFournisseurs()))
                .collect(Collectors.toList());
        bilan.put("Passif", passifDTO);

        List<FinancialItemDTO> passifNonCourantDTO = ((List<PassifNonCourant>) passifNonCourantRepository.findByBilan(idBilan)).stream()
                .map(pn -> new FinancialItemDTO("Emprunts", pn.getEmprunts()))
                .collect(Collectors.toList());
        bilan.put("PassifNonCourant", passifNonCourantDTO);

        List<FinancialItemDTO> actifCourantDTO = ((List<ActifCourant>) actifCourantRepository.findByBilan(idBilan)).stream()
                .map(a -> new FinancialItemDTO("Stocks", a.getStocks()))
                .collect(Collectors.toList());
        bilan.put("ActifCourant", actifCourantDTO);

        List<FinancialItemDTO> actifImmobiliseDTO = ((List<ActifImmobilise>) actifImmobiliseRepository.findByBilan(idBilan)).stream()
                .map(a -> new FinancialItemDTO("Immobilisations Corporelles", a.getImmobilisationsCorporelles()))
                .collect(Collectors.toList());
        bilan.put("ActifImmobilise", actifImmobiliseDTO);

        return bilan;
    }
}
