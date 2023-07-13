package id.co.mii.serverapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.LeaveBalance;

@Repository
public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Long>{
    @Query("SELECT lb FROM LeaveBalance lb WHERE lb.employee = :employee")
    LeaveBalance findByEmployee(@Param("employee") Employee employee);
}
