package com.doctorappointment.userservice.service;

import java.util.List;

import com.doctorappointment.userservice.entity.UserCredential;

public interface AuthService {

	String saveUser(UserCredential credential);
	String generateToken(String username);
	void validateToken(String token);
	String getRoleByName(String name);
	List<UserCredential> getAllUser();
	UserCredential getUserById(Integer id);
	UserCredential getUserByName(String username);
	List<UserCredential> getUserByRole(String role);
	UserCredential updateUser(Integer id, UserCredential user);
	void deleteUser(Integer id);
	
}
