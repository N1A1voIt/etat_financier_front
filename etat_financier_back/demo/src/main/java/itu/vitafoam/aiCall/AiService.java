package itu.vitafoam.aiCall;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiService {
@Value("${openai.api.key}")
    private String OPENAI_API_KEY;

    @Value("${openai.api.url}")
    private String API_URL;

    public String queryChatbot(String query) {
        System.out.println(query);
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4");
        requestBody.put("max_tokens", 500);

        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "");

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        String q = "You are a financial analyst. Based on the following financial ratios, provide a detailed interpretation of the company's financial health. " +
                "Explain what each ratio means, whether it is good or bad, and provide actionable recommendations for improvement." +
                "\\n\\nRatios:\\n\""+query+"";
        userMessage.put(
                "content",
                q
        );

        requestBody.put("messages", new Map[] {systemMessage, userMessage});
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);
            System.out.println(response.getBody());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            String content = rootNode
                    .path("choices") // Navigate to "choices"
                    .get(0)          // Access the first element in the array
                    .path("message") // Navigate to "message"
                    .path("content") // Access "content"
                    .asText();       // Get the value as a String


//            fahalalana.setVotoaty(content);
//            return fahalalana;
            return content;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
