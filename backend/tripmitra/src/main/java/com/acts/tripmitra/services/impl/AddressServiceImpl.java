package com.acts.tripmitra.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.AddressDto;
import com.acts.tripmitra.entity.Address;
import com.acts.tripmitra.repository.AddressRepository;
import com.acts.tripmitra.services.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Integer createAddress(AddressDto dto) {
        Address address = new Address();
        BeanUtils.copyProperties(dto, address);
        Address saved = addressRepository.save(address);
        return saved.getAddressId();
    }

    @Override
    public AddressDto getAddressById(Integer id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id: " + id));
        AddressDto dto = new AddressDto();
        BeanUtils.copyProperties(address, dto);
        return dto;
    }

    @Override
    public List<AddressDto> getAllAddresses() {
        return addressRepository.findAll().stream()
                .map(address -> {
                    AddressDto dto = new AddressDto();
                    BeanUtils.copyProperties(address, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public AddressDto updateAddress(Integer id, AddressDto dto) {
        Address existing = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id: " + id));

        BeanUtils.copyProperties(dto, existing, "addressId");

        Address updated = addressRepository.save(existing);
        AddressDto result = new AddressDto();
        BeanUtils.copyProperties(updated, result);
        return result;
    }

    @Override
    public void deleteAddress(Integer id) {
        addressRepository.deleteById(id);
    }
}
