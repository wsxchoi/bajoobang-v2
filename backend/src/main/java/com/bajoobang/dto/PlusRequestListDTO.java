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
public class PlusRequestListDTO {
    private List<PlusRequestDTO> plusRequestDTOList;

    public static List<PlusRequestDTO> toDTO(List<PlusRequest> plusRequestListEntity){
        List<PlusRequestDTO> plusRequestListDTO = new ArrayList<>();
        for (PlusRequest plusRequest : plusRequestListEntity) {
            plusRequestListDTO.add(PlusRequestDTO.toDTO(plusRequest));
        }
        return plusRequestListDTO;
    }
}
