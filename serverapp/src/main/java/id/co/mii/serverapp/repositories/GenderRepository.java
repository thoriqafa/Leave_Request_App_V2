package id.co.mii.serverapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.co.mii.serverapp.models.Gender;

@Repository
public interface GenderRepository extends JpaRepository<Gender, Integer>{    
}
