package com.bajoobang.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FinishForm {

    private List<FileDto> fileDtos;
    private BalpoomForm balpoomForm;
    private PlusReqeustForFinishDTO plusReqeustForFinishDTO;
}
