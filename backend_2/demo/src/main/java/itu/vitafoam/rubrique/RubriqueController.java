package itu.vitafoam.rubrique;

import itu.vitafoam.utils.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class RubriqueController {
    @Autowired
    RubriqueRepository rubriqueRepository;
    @Autowired
    RubriqueService rubriqueService;
    @GetMapping("/api/rubriques")
    public ResponseEntity<ResponseBody> getAll(){
        ResponseBody responseBody = new ResponseBody();
        try{
            responseBody.setStatusCode(200);
            responseBody.setData(rubriqueRepository.findAll());
            responseBody.setExceptions(null);
            return ResponseEntity.ok(responseBody);
        }catch (Exception e){
            e.printStackTrace();
            responseBody.setStatusCode(500);
            responseBody.setData(null);
            responseBody.setExceptions(new Exception[]{e});
            return ResponseEntity.badRequest().body(responseBody);
        }
    }
    @GetMapping("/api/rubriques/bilan")
    public ResponseEntity<ResponseBody> getBilan(){
        ResponseBody responseBody = new ResponseBody();
        try{
            responseBody.setStatusCode(200);
            responseBody.setData(rubriqueService.getBilan());
            responseBody.setExceptions(null);
            return ResponseEntity.ok(responseBody);
        }catch (Exception e){
            e.printStackTrace();
            responseBody.setStatusCode(500);
            responseBody.setData(null);
            responseBody.setExceptions(new Exception[]{e});
            return ResponseEntity.badRequest().body(responseBody);
        }
    }
    @PostMapping("/api/rubriques")
    public ResponseEntity<ResponseBody> save(@RequestBody Rubrique rubrique){
        ResponseBody responseBody = new ResponseBody();
        try{
            responseBody.setStatusCode(200);
            responseBody.setData(rubriqueRepository.save(rubrique));
            responseBody.setExceptions(null);
            return ResponseEntity.ok(responseBody);
        }catch (Exception e){
            e.printStackTrace();
            responseBody.setStatusCode(500);
            responseBody.setData(null);
            responseBody.setExceptions(new Exception[]{e});
            return ResponseEntity.badRequest().body(responseBody);
        }
    }
}
