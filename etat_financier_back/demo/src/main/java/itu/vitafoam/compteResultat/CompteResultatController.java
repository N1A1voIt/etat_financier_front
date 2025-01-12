package itu.vitafoam.compteResultat;

import itu.vitafoam.YearCorpDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompteResultatController {
    @Autowired
    CompteResultatRepository compteResultatRepository;
    @Autowired
    CompteResultatService compteResultatService;
    @PostMapping("/api/compte-resultat")
    public ResponseEntity<?> save(@RequestBody CompteResultat compteResultat){
        try{
            return ResponseEntity.ok(compteResultatRepository.save(compteResultat));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/api/compte-resultat-year")
    public ResponseEntity<?> get(@RequestBody YearCorpDTO yearCorpDTO){
        try{
            CompteResultatCpl compteResultatCpl = compteResultatService.getCompteResultat(yearCorpDTO);
            System.out.println(compteResultatCpl.compteResultatCplRows.size());
            return ResponseEntity.ok(compteResultatCpl);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
