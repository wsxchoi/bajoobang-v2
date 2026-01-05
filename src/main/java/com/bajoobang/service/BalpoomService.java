package com.bajoobang.service;

import com.bajoobang.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bajoobang.domain.House;
import com.bajoobang.domain.Request;
import com.bajoobang.dto.AlarmRequestDTO;
import com.bajoobang.dto.HouseDTO;
import com.bajoobang.dto.MemberDTO;
import com.bajoobang.repository.HouseRepository;
import com.bajoobang.repository.RequestRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BalpoomService {

    private final HouseRepository houseRepository;
    private final AlarmRepository alarmRepository;
    private final RequestRepository requestRepository;

    public List<HouseDTO> getBalpoom(Long local_id){
        List<House> houseList = houseRepository.findByLocalIdAndRequest(local_id);
        List<HouseDTO> dtoList = new ArrayList<>();

        for(House house : houseList){
            dtoList.add(HouseDTO.toDTO(house));
        }
        return dtoList;
    }

    public List<AlarmRequestDTO> getAlarmBalpoom(MemberDTO memberDTO){
//        log.info("============================= getAlarmBalpoom 시작");
        List<AlarmRequestDTO> alarmRequestDTOList = new ArrayList<>();
        // 모든 요청서 조회,
        // 매칭전의 요청서만 보이면 좋을듯
//        List<Request> requestList = requestRepository.findAll();

//        log.info("request list 찾기 시작");
        List<Request> requestList = requestRepository.findByStatus("매칭 전");
//        log.info("request list 찾기 종료");
        for(Request request : requestList){
            // 내가 올린 요청서는 제외
            if (!memberDTO.getId().equals(request.getMember().getId())) {
                AlarmRequestDTO alarmRequestDTO = new AlarmRequestDTO();
                boolean checkAlarm = false;

                // 요청서 id -> 그 요청서의 알람을 받은 멤버들의 id 리스트
//            log.info("알람 찾기 시작");
                List<Long> alarmMemIdList = alarmRepository.findMemberIdByRequestId(request.getRequestId());
//            log.info("알람 찾기 종료");
                // 그 요청서에 대한 매물
//            log.info("매물 찾기 시작");
                House requestHouse = requestRepository.findHouseByRequestId(request.getRequestId());
//            log.info("매물 찾기 종료");
                if(alarmMemIdList.contains(memberDTO.getId())){
                    checkAlarm = true;
                }
//            log.info("AlarmRequestDTO toDTO 시작");
                alarmRequestDTOList.add(alarmRequestDTO.toDTO(request, requestHouse, checkAlarm));
//            log.info("AlarmRequestDTO toDTO 종료");
            }
        }

        return alarmRequestDTOList;
    }
}
