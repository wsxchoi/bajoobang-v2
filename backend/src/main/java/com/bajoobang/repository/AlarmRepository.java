package com.bajoobang.repository;

import com.bajoobang.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.bajoobang.domain.Alarm;
import com.bajoobang.domain.Request;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    @Query("select a.member.id from Alarm a where a.request.requestId = :requestId")
    List<Long> findMemberIdByRequestId(Long requestId);

    List<Alarm> findByMember(Member member);

    List<Alarm> findByRequest(Request request);
}
