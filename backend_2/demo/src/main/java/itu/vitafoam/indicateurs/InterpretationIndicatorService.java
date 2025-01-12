package itu.vitafoam.indicateurs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterpretationIndicatorService {

    @Autowired
    private InterpretationRepository repository;

    public List<Interpretation> getAllInterpretations() {
        return repository.findAll();
    }
}
