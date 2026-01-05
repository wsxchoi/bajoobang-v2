package com.bajoobang.repository;

import com.bajoobang.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bajoobang.domain.PlusRequest;

import java.util.List;

@Repository
public interface PlusRequestRepository extends JpaRepository<PlusRequest, Long> {

    PlusRequest save(PlusRequest plusRequest);

    List<PlusRequest> findByRequest(Request request);
}

