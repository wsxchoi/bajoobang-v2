package com.bajoobang.service;

import com.bajoobang.domain.Request;
import com.bajoobang.dto.HouseDTO;
import com.bajoobang.dto.RequestDTO;
import com.bajoobang.repository.HouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.bajoobang.domain.House;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HouseService {

    private final HouseRepository houseRepository;

    public List<HouseDTO> getHouse(Long local_id){
        List<House> houseList = houseRepository.findByLocalId(local_id);
        List<HouseDTO> dtoList = new ArrayList<>();

        for (House house : houseList){
            dtoList.add(HouseDTO.toDTO(house));
        }

        return dtoList;
    }

    public HouseDTO getHouseDetail(Long house_id){
        House house = houseRepository.findByHouseId(house_id);
        return HouseDTO.toDTO(house);
    }

    public ArrayList<Object> getAddress(long house_id){
        ArrayList<Object> addressList = new ArrayList<>();
        House house = houseRepository.findByHouseId(house_id);
        addressList.add(house.getContent());
        addressList.add(house.getStair());
        return addressList;
    }

    public List<RequestDTO> getRequests(Long house_id) {
        List<RequestDTO> requestListDTO = new ArrayList<>();
        House house = houseRepository.findByHouseId(house_id);
        List<Request> requests = house.getRequests();
        for (Request request : requests) {
            requestListDTO.add(RequestDTO.toDTO(request));
        }
        return requestListDTO;
    }



}
