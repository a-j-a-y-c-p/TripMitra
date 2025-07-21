package com.acts.tripmitra.controllers;

import com.acts.tripmitra.dto.AddressDto;
import com.acts.tripmitra.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public AddressDto createAddress(@RequestBody AddressDto addressDto) {
        return addressService.createAddress(addressDto);
    }

    @GetMapping("/{id}")
    public AddressDto getAddress(@PathVariable Integer id) {
        return addressService.getAddressById(id);
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
