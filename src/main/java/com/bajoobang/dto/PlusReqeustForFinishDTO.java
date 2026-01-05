package com.bajoobang.dto;

import lombok.*;
import com.bajoobang.domain.PlusRequest;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlusReqeustForFinishDTO {
    private List<String> questions;
    private List<String> answers;
    private List<Integer> fileCounts;


    public static PlusReqeustForFinishDTO toDTO(List<PlusRequest> plusRequestList){
        List<String> questions = new ArrayList<>();
        List<String> answers = new ArrayList<>();
        List<Integer> fileCounts = new ArrayList<>();

        for(PlusRequest plusRequest : plusRequestList){
            questions.add(plusRequest.getPlus_q());
            answers.add(plusRequest.getPlus_answer());
            fileCounts.add(plusRequest.getFileCount());
        }

        return PlusReqeustForFinishDTO.builder()
                .questions(questions)
                .answers(answers)
                .fileCounts(fileCounts)
                .build();
    }
}

