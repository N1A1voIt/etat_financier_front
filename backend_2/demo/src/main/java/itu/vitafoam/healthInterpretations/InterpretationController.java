package itu.vitafoam.healthInterpretations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InterpretationController {
    @Autowired
    InterpretationService interpretationService;

    @GetMapping("/api/interpretations")
    public ResponseEntity<?> interpret()  {
        try{
            return ResponseEntity.ok(interpretationService.interprete());
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e);
        }
    }
}
