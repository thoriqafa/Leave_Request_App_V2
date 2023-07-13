package id.co.mii.serverapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.co.mii.serverapp.models.History;
import id.co.mii.serverapp.models.LeaveRequest;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long>{
    Optional<History> findById(Long id);    
    
    @Query("SELECT lr FROM History lr WHERE lr.leaveRequest = :leaveRequest")
    List<History> findByLeaveRequestId(@Param("leaveRequest") LeaveRequest leaveRequest);
}
