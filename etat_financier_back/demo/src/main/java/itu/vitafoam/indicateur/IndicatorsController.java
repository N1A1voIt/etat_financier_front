package itu.vitafoam.indicateur;

import itu.vitafoam.YearCorpDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndicatorsController {
    @Autowired
    InterpretationsService interpretationsService;
    @PostMapping("/api/indicateurs")
    public ResponseEntity<?> indicateurs(@RequestBody YearCorpDTO yearCorpDTO){
        try{
            return ResponseEntity.ok(interpretationsService.interpret(yearCorpDTO));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
