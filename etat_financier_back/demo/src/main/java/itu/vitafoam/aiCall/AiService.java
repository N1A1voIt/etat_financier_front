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

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiService {

    @Value("${openai.api.key}")
    private String OPENAI_API_KEY;

    @Value("${openai.api.url}")
    private String API_URL;

    public String queryChatbot(String query) {
        System.out.println("Query: " + query);

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "jamba-1.5-large"); // Ensure this is the correct model name
        requestBody.put("max_tokens", 2000);

        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are a financial analyst.");

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", "You are a financial analyst. Based on the following financial ratios, provide a detailed interpretation of the company's financial health. "
                + "Explain what each ratio means, whether it is good or bad, and provide actionable recommendations for improvement" +
                "I want you to return an array of json with those field for each member:    String label;\n" +
                "    BigDecimal ratio;\n" +
                "    String interpretation;\n" +
                "    String solution;\n" +
                ".\n\nonly return the json .Ratios:\n" + query);

        requestBody.put("messages", new Map[]{systemMessage, userMessage});

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            String content = rootNode
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            return content;

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("HTTP Error: " + e.getStatusCode() + ", " + e.getResponseBodyAsString());
            return "An error occurred while calling the API: " + e.getStatusCode();
        } catch (Exception e) {
            e.printStackTrace();
            return "An unexpected error occurred.";
        }
    }
}
