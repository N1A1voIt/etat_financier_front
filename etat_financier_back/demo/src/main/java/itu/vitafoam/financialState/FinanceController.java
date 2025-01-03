package itu.vitafoam.financialState;

import itu.vitafoam.bilan.Bilan;
import itu.vitafoam.bilan.BilanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FinanceController {
    @Autowired
    BilanService bilanService;
    @PostMapping("/api/finance-form")
    public ResponseEntity<?> saveFinance(@RequestBody FinancialForm financialForm) {
        System.out.println("Na ato ary");
        try {
            System.out.println("Mandeha");
            Bilan bilan = bilanService.creerBilanEtFille(financialForm);
            return ResponseEntity.ok(bilan);
        } catch (Exception e) {
            System.out.println("Mandeha");
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
