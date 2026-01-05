package com.bajoobang.repository;

import com.bajoobang.domain.BaDream;
import com.bajoobang.domain.Member;
import com.bajoobang.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BaDreamRepository extends JpaRepository<BaDream, Long> {
    List<BaDream> findByRequestIn(List<Request> requests);
    List<BaDream> findByMember(Member member);
}
