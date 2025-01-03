package itu.vitafoam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ExampleController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, SpringDoc with WebFlux!";
    }
}
