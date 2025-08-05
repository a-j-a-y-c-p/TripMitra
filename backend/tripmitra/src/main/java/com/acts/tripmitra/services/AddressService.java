package com.acts.tripmitra.services;

import java.util.List;
import com.acts.tripmitra.dto.AddressDto;

public interface AddressService {
    Integer createAddress(AddressDto addressDto);
    AddressDto getAddressById(Integer id);
    List<AddressDto> getAllAddresses();
    AddressDto updateAddress(Integer id, AddressDto addressDto);
    void deleteAddress(Integer id);
}
