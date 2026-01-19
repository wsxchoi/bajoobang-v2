package com.bajoobang.repository;

import com.bajoobang.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bajoobang.domain.File;

import java.util.List;

@Repository
public interface BalpoomFileRepository extends JpaRepository<File, Long> {
    List<File> findByRequest(Request request);
}
