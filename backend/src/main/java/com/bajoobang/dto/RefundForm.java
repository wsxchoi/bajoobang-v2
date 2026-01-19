package com.bajoobang.dto;

import lombok.Data;

@Data
public class RefundForm {
    private String reasonForRefund;
    private Long request_id;
}
