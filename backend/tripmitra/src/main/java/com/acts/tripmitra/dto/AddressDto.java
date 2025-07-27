package com.acts.tripmitra.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {
//    private Integer addressId;
    private String district;
    private String state;
    private String pincode;
    private String addressLine1;
    private String addressLine2;
}
