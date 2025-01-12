package itu.vitafoam.compte_resultat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/financial-data")
public class FinancialDataController {

    @Autowired
    private FinancialDataRepository financialDataService;

    @PostMapping
    public ResponseEntity<FinancialData> createFinancialData(@RequestBody FinancialData financialData) {
        financialData.setYear(2024);
        FinancialData savedData = financialDataService.save(financialData);
        return ResponseEntity.ok(savedData);
    }

    @GetMapping("/{year}")
    public ResponseEntity<FinancialData> getFinancialData(@PathVariable Integer year) {
        return financialDataService.findById(year)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }
}