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

import java.util.*;

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

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDOHmIoo8Ll0nkZDwz2Ct1-z4f0l1Oy-a4";

    public String queryChatbot(String query,String balanceSheet) {
        System.out.println("Query: " + query);

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "jamba-1.5-large");
        requestBody.put("max_tokens", 2000);

        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are a financial analyst.");

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", "You are a financial analyst. Based on the following financial ratios and the balance sheets, provide a detailed interpretation of the company's financial health. "
                + "Explain what each ratio means, whether it is good or bad, and provide actionable recommendations for improvement" +
                "I want you to return an array of json with those field for each member:    String label;\n" +
                "    BigDecimal ratio;\n" +
                "    String interpretation;\n" +
                "    String solution;\n" +
                ".\n\nonly return the json.Make the results in french .Ratios:\n" + query +" Balance sheets:"+balanceSheet);

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
    public String queryChatbot2(String query, String balanceSheet,String compteResultat) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> contents = new ArrayList<>();

        Map<String, Object> content = new HashMap<>();
        List<Map<String, String>> parts = new ArrayList<>();

        Map<String, String> textPart = new HashMap<>();
        textPart.put("text", "You are a financial analyst. Based on the following financial ratios, the balance sheets and the income statement, provide a detailed interpretation of the company's financial health. "
                + "Explain what each ratio means, whether it is good or bad, and provide actionable recommendations for improvement ,overall tell me what to do with the elements of my balance sheets inside the recommendations.In the solutions use the amounts to explain your solution "
                + "I want you to return an array of JSON with the following fields for each member: "
                + "String label; BigDecimal ratio; String interpretation; String solution; and next to the array of JSON add a String globalSolution so the pattern will look like this {items:[],globalSolution:}. When you are making interpretations avoid using id inside answers but use the names ,the labels or the rubriques I mean use the strings"
                + "Only return the JSON. Make the results in French. Ratios:\n" + query + " Balance sheets:\n" + balanceSheet+" Income statement:\n"+compteResultat);

        parts.add(textPart);
        content.put("parts", parts);
        contents.add(content);
        requestBody.put("contents", contents);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, entity, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            String generatedContent = rootNode
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            return generatedContent;

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("HTTP Error: " + e.getStatusCode() + ", " + e.getResponseBodyAsString());
            return "An error occurred while calling the API: " + e.getStatusCode();
        } catch (Exception e) {
            e.printStackTrace();
            return "An unexpected error occurred.";
        }
    }
}
