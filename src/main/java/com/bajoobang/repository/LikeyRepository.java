package com.bajoobang.repository;

import com.bajoobang.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bajoobang.domain.Likey;

import java.util.List;

@Repository
public interface LikeyRepository extends JpaRepository<Likey, Long> {

    List<Likey> findByMember(Member member);
}
