package id.co.mii.serverapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.co.mii.serverapp.models.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    public Optional<Department> findByName(String name);
}
