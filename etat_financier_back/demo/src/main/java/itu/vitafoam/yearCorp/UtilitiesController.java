package itu.vitafoam.yearCorp;

import itu.vitafoam.annee.Annee;
import itu.vitafoam.annee.AnneeRepository;
import itu.vitafoam.entreprise.Entreprise;
import itu.vitafoam.entreprise.EntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtilitiesController {
    @Autowired
    AnneeRepository anneeRepository;
    @Autowired
    EntrepriseRepository entrepriseRepository;

    @GetMapping("/api/yearCorp")
    public ResponseEntity<?> getYearCorp(){
        try{
            AnneeEntreprise anneeEntreprise = new AnneeEntreprise();
            anneeEntreprise.setAnnees(anneeRepository.findAll().toArray(new Annee[0]));
            anneeEntreprise.setEntreprises(entrepriseRepository.findAll().toArray(new Entreprise[0]));
            return ResponseEntity.ok(anneeEntreprise);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
