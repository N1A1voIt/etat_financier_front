package itu.vitafoam.compteResultat;

import itu.vitafoam.YearCorpDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompteResultatService {
    @Autowired
    CompteResultatRepository compteResultatRepository;

    public CompteResultatCpl getCompteResultat(YearCorpDTO yearCorpDTO){
        CompteResultat compteResultat = compteResultatRepository.findByIdEntrepriseAndIdAnnee(yearCorpDTO.getIdEntreprise(), yearCorpDTO.getIdAnnee()).orElse(null);
        System.out.println(compteResultat);
        CompteResultatCpl compteResultatCpl = new CompteResultatCpl();
        compteResultatCpl.addLabelAmmount("Revenus",compteResultat.getRevenus(),false);
        compteResultatCpl.addLabelAmmount("Charges d'exploitation",compteResultat.getChargesExploitation(),false);
        compteResultatCpl.addLabelAmmount("Résultat d'exploitation",compteResultat.getResultatExploitation(),true);
        compteResultatCpl.addLabelAmmount("Charges financières",compteResultat.getChargesFinancieres(),false);
        compteResultatCpl.addLabelAmmount("Impôts",compteResultat.getImpots(),false);
        compteResultatCpl.addLabelAmmount("Résultat net",compteResultat.getResultatNet(),true);
        return compteResultatCpl;
    }
}
