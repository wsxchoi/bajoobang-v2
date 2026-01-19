package com.bajoobang.domain;

import com.bajoobang.dto.PlusRequestDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.json.JsonMapper;

import java.util.Map;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class PlusRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plus_id")
    private Long id;
    // 질문 내용
    private String plus_q;
    // 질문 타입
    private String q_type;
    // 답변 내용
    private String plus_answer;
    // 이미지 개수
    private int fileCount;

    //    @JoinColumn(name="request_id", insertable = false, updatable = false)
    @ManyToOne
    @JoinColumn(name = "request_id")
    @JsonBackReference
    private Request request;

//    public static PlusRequest toEntity(List<PlusRequest> dto){
//        ObjectMapper objectMapper = new ObjectMapper();
//        PlusRequestBuilder builder = new PlusRequestBuilder();
//        TypeReference<List<Map<String, String>>> typeReference = new TypeReference<List<Map<String, String>>>() {};
//        try{
//            String plusListJson = objectMapper.writeValueAsString(dto);
//            List<Map<String, String>>  plusRequests = objectMapper.readValue(plusListJson, typeReference);
//            for(Map<String, String> plusRequest : plusRequests){
//                builder.q_type(plusRequest.get("q_type"));
//                builder.question(plusRequest.get("question"));
//                builder.build();
//            }
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return builder.build();
//    }

    public static PlusRequest toEntity2(PlusRequestDTO plus){
        JsonMapper jsonMapper = new JsonMapper();
        PlusRequestBuilder builder = new PlusRequestBuilder();
        
        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String, String>>() {};
        try{
            String plusListJson = jsonMapper.writeValueAsString(plus);
            Map<String, String>  plusRequest = jsonMapper.readValue(plusListJson, typeReference);
            builder.q_type(plusRequest.get("q_type"));
            builder.plus_q(plusRequest.get("plus_q"));
            builder.build();
        }catch (Exception e){
            e.printStackTrace();
        }
        return builder.build();
    }
}
