package com.bajoobang.service;

import com.bajoobang.domain.*;
import com.bajoobang.dto.RequestDTO;
import com.bajoobang.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bajoobang.dto.BalpoomForm;
import com.bajoobang.dto.PlusAnswerForm;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Random;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RequestService {
    private final RequestRepository requestRepository;
    private final PlusRequestRepository plusRequestRepository;
    private final MemberRepository memberRepository;
    private final HouseRepository houseRepository;
    private final OrderRepository orderRepository;
    private final AlarmRepository alarmRepository;

    public Request saveRequest(RequestDTO requestDTO, Member member, House house, String address){
        member = memberRepository.findById(member.getId()).orElseThrow(() -> new IllegalArgumentException("Member not found"));
        house = houseRepository.findById(house.getHouseId()).orElseThrow(() -> new IllegalArgumentException("House not found"));
        Request request = Request.toEntity(requestDTO, member, house, address);
        // 저장할 때, house_id와 함께 저장해주어야 함. => 테이블도 join해주어야 함!!! --> 위에 함
        member.setRequest(request);
        house.setRequest(request);
        // 매칭 상태값 매칭 전으로 초기화
        request.setStatus("매칭 전");
        Request saveRequest = requestRepository.save(request);

        // test
        for(int i=0; i< requestDTO.getPlus_list().size(); i++){
            PlusRequest plus = PlusRequest.toEntity2(requestDTO.getPlus_list().get(i));
            plus.setRequest(request);
            plusRequestRepository.save(plus);
        }

        /*PlusRequest plusRequest = PlusRequest.toEntity(requestDTO.getPlus_list());
        plusRequest.setRequest(request);
        plusRequestRepository.save(plusRequest);*/

        return saveRequest;
    }

//    // 등록매물 리스트
//    public List<RequestDTO> findMyRequests(Long memberId) {
//        List<RequestDTO> myRequestsDTO = new ArrayList<>();
//        List<Request> requestList = requestRepository.findByMemberId(memberId);
//
//        for (Request request : requestList) {
//            myRequestsDTO.add(RequestDTO.toDTO(request));
//        }
//        return myRequestsDTO;
//    }


    public BalpoomForm getRequestInfo(Long request_id){
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        List<PlusRequest> plusRequestList = plusRequestRepository.findByRequest(request);

        return BalpoomForm.toDTO(plusRequestList, request);
    }

    public List<Request> getRequest(){
        return requestRepository.findAll();
    }

    @Transactional
    public void patchInfo(Long request_id, BalpoomForm balpoomForm){
        Request request = requestRepository.getReferenceById(request_id);

        Random random = new Random();

        int powerShower = random.nextInt(3) + 1;
        int powerWater = random.nextInt(3) + 1;
        int powerWash = random.nextInt(3) + 1;

        boolean moldLiving = random.nextBoolean();
        boolean moldRest = random.nextBoolean();
        boolean moldVeranda = random.nextBoolean();
        boolean moldShoes = random.nextBoolean();
        boolean moldWindow = random.nextBoolean();

        String[] optionsL = {"good", "cover", "sun back"};
        String lighting = optionsL[random.nextInt(optionsL.length)];

        String[] optionM = {"mold", "non"};


        request.setLighting(lighting);
        request.setPowerShower(powerShower);
        request.setPowerWater(powerWater);
        request.setPowerWash(powerWash);
        request.setTimeWater1(balpoomForm.getTimeWater1());
        request.setTimeWater2(balpoomForm.getTimeWater2());
        request.setTimeWash1(balpoomForm.getTimeWash1());
        request.setTimeWash2(balpoomForm.getTimeWash2());
        request.setTimeShower1(balpoomForm.getTimeShower1());
        request.setTimeShower2(balpoomForm.getTimeShower2());
        request.setMoldLiving(moldLiving);
        request.setMoldRest(moldRest);
        request.setMoldVeranda(moldVeranda);
        request.setMoldShoes(moldShoes);
        request.setMoldWindow(moldWindow);
        // 매칭 상태값 -> 작성 완료
        request.setStatus("작성 완료");
        requestRepository.save(request);
    }

    @Transactional
    public void patchAnswerFilecounts(PlusAnswerForm plusAnswerForm, Long request_id){
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        List<PlusRequest> plusRequestList = plusRequestRepository.findByRequest(request);

        List<String> answers = plusAnswerForm.getAnswers();
        List<Integer> fileCounts = plusAnswerForm.getFileCounts();

        for(int i=0; i<plusRequestList.size(); i++){
            PlusRequest plusRequest = plusRequestList.get(i);
            String answer = answers.get(i);
            Integer filecount = fileCounts.get(i);

            plusRequest.setPlus_answer(answer);
            plusRequest.setFileCount(filecount);

            plusRequestRepository.save(plusRequest);
        }

    }

    public List<PlusRequest> getPlusRequestList(Long request_id){
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        return plusRequestRepository.findByRequest(request);
    }

    // 구매 확정
    @Transactional
    public void confirm(Member member, Long request_id) throws Exception{
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        // 요청서를 작성한 멤버가 맞다면
        if (member.getId().equals(request.getMember().getId())) {
            request.setStatus("구매 확정");
            requestRepository.save(request);
        }
        else {
            throw new AccessDeniedException("You do not have permission to confirm this request.");
        }
    }

    // 구매 취소
    @Transactional
    public void withdraw(Member member, Long request_id) throws Exception{
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        // 요청서를 작성한 멤버가 맞다면
        if (member.getId().equals(request.getMember().getId())) {
            // 추가질문 삭제
            List<PlusRequest> plusRequestList = plusRequestRepository.findByRequest(request);
            plusRequestRepository.deleteAll(plusRequestList);
            // 알람 삭제
            List<Alarm> alarmList = alarmRepository.findByRequest(request);
            alarmRepository.deleteAll(alarmList);
            // 결제 정보 삭제
            Order order = orderRepository.findByRequest(request);
            orderRepository.delete(order);
            // 요청서 삭제
            requestRepository.delete(request);
        }
        else {
            throw new AccessDeniedException("You do not have permission to delete this request.");
        }
    }

    // 환불 신청
    @Transactional
    public void refund(Member member, Long request_id, String reasonForRefund) throws Exception{
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        // 요청서를 작성한 멤버가 맞다면
        if (member.getId().equals(request.getMember().getId())) {
            // 1. 환불 사유 기입
            Order order = orderRepository.findByMemberIdAndRequestRequestId(member.getId(), request_id);
            order.setReasonForRefund(reasonForRefund);
            orderRepository.save(order);
            request.setStatus("환불 중");
        }
        else {
            throw new AccessDeniedException("You do not have permission to refund this request.");
        }
    }
}
