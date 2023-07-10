package id.co.mii.serverapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.co.mii.serverapp.models.History;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long>{
    Optional<History> findById(Long id);    
}
