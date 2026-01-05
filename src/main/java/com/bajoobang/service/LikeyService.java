package com.bajoobang.service;

import com.bajoobang.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bajoobang.domain.House;
import com.bajoobang.domain.Likey;
import com.bajoobang.repository.HouseRepository;
import com.bajoobang.repository.LikeyRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LikeyService {

    private final LikeyRepository likeyRepository;
    private final HouseRepository houseRepository;

    public void setLike(Member member, Long house_id) {
        Likey likey = new Likey();
        likey.setMember(member);
        House byHouseId = houseRepository.findByHouseId(house_id);
        likey.setHouse(byHouseId);
        likeyRepository.save(likey);
    }

    @Transactional
    public void deleteLike(Member member, Long house_id) {
        List<Likey> byMember = likeyRepository.findByMember(member);
        for (Likey likey : byMember) {
            if (likey.getHouse().getHouseId() == house_id) {
                likeyRepository.delete(likey);
            }
        }
    }

    // 찜 리스트
    public List<Map<String, Object>> getLikeInfo(Member member) {
        List<Map<String, Object>> likeInfo = new ArrayList<>();
        List<Likey> byMember = likeyRepository.findByMember(member);
        for (Likey likey : byMember) {
            Map<String, Object> likeMap = new HashMap<>();
            House house = likey.getHouse();
            likeMap.put("address", house.getContent());
            likeMap.put("month_price", house.getMoney2());
            likeMap.put("house_id", house.getHouseId());
            likeInfo.add(likeMap);
        }
        return likeInfo;
    }

    public int getNumOfLikes(Member member) {
        List<Likey> byMember = likeyRepository.findByMember(member);
        return byMember.size();
    }
}
