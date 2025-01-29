package com.backend.lms.Repository;

import com.backend.lms.Entity.EmiSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmiScheduleRepository extends JpaRepository<EmiSchedule, Long> {

    @Query("SELECT em FROM EmiSchedule em where em.lenderApprovedApplication.loanId=:loanId")
    List<EmiSchedule> findByLoanId(@Param("loanId")String loanId);


     @Query("SELECT em FROM EmiSchedule em where em.lenderApprovedApplication.loanId=:loanId AND em.status=:status")
    List<EmiSchedule> getByLoanId(@Param("loanId") String loanId,@Param("status") String status);




}