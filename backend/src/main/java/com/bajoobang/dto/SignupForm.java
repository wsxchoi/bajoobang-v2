package com.bajoobang.dto;

import lombok.Data;

@Data
public class SignupForm {
    private String name;
    private String email;
    private String pw;
    private String address;
    private double latitude;
    private double longitude;
    private String account;
}
