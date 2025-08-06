package com.acts.tripmitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.dto.AddressDto;
import com.acts.tripmitra.services.AddressService;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public Integer createAddress(@RequestBody AddressDto addressDto) {
        return addressService.createAddress(addressDto);
    }

    @GetMapping("/{id}")
    public AddressDto getAddress(@PathVariable Integer id) {
        return addressService.getAddressById(id);
    }
    
    @GetMapping("/a")
    public AddressDto getAddress(@RequestHeader("Authorization") String authHeader) {
        return addressService.getAddressByUserId(authHeader);
    }

    @GetMapping
    public List<AddressDto> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    @PutMapping("/{id}")
    public AddressDto updateAddress(@PathVariable Integer id, @RequestBody AddressDto addressDto) {
        return addressService.updateAddress(id, addressDto);
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Integer id) {
        addressService.deleteAddress(id);
    }
}
