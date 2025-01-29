package com.backend.lms.Repository;


import com.backend.lms.Entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface BankDetailsRepository extends JpaRepository<BankDetails, String> {


}
