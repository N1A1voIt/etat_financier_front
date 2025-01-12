package itu.vitafoam.indicateurs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InterpretationController {

    @Autowired
    private InterpretationService service;

    @GetMapping("/interpretations")
    public List<Interpretation> getAllInterpretations() {
        return service.getAllInterpretations();
    }
}
