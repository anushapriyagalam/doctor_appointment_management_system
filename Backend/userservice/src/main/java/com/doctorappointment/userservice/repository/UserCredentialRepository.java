package com.doctorappointment.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doctorappointment.userservice.entity.UserCredential;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCredentialRepository extends JpaRepository<UserCredential,Integer> {
    
	Optional<UserCredential> findByName(String username);
	List<UserCredential> findByRole(String role);
	
}
