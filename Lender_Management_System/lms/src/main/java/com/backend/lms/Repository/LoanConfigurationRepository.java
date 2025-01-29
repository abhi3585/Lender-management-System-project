package com.backend.lms.Repository;


import com.backend.lms.Entity.EmiSchedule;
import com.backend.lms.Entity.LoanConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;





@Repository
public interface LoanConfigurationRepository extends JpaRepository<LoanConfiguration, Long> {




    @Query("SELECT lc FROM Loan_Configuration lc WHERE lc.lender.lenderId = :lenderId")   // Fetch multiple loan configurations by lenderId
    List<LoanConfiguration> findByLenderId(@Param("lenderId") String lenderId);



    List<LoanConfiguration> findByLoanType(String loanType);
}


