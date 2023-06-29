package id.co.mii.serverapp.repositories;

import org.springframework.stereotype.Repository;

import id.co.mii.serverapp.models.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{}
