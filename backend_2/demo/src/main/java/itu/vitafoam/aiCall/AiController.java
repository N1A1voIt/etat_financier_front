package itu.vitafoam.aiCall;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {
    @Autowired
    AiService aiService;
//    @GetMapping("/api/call")
//    public ResponseEntity<?> call(){
//        String resp = aiService.queryChatbot("{\n" +
//                "  \"idEntreprise\": 1,\n" +
//                "  \"idAnnee\": 2023,\n" +
//                "  \"margeNette\": 15.5,\n" +
//                "  \"retourSurActifs\": 10.2,\n" +
//                "  \"ratioLiquiditeGenerale\": 1.8,\n" +
//                "  \"ratioLiquiditeReduite\": 1.5,\n" +
//                "  \"ratioEndettementGlobal\": 60.0,\n" +
//                "  \"couvertureInterets\": 5.7\n" +
//                "}");
//        return ResponseEntity.ok(resp);
//    }
}
