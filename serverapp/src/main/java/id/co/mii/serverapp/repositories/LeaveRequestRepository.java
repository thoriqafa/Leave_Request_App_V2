package id.co.mii.serverapp.repositories;

import id.co.mii.serverapp.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.co.mii.serverapp.models.LeaveRequest;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee != :employee")
    List<LeaveRequest> findByEmployeeNot(@Param("employee") Employee employee);

    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee = :employee")
    List<LeaveRequest> findByEmployee(@Param("employee") Employee employee);
}
