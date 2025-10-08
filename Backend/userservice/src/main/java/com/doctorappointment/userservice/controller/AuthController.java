package com.doctorappointment.userservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.doctorappointment.userservice.dto.AuthRequest;
import com.doctorappointment.userservice.entity.UserCredential;
import com.doctorappointment.userservice.service.AuthServiceImpl;

@CrossOrigin("*")
@RestController
public class AuthController {
    
	@Autowired
    private AuthServiceImpl service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/auth/register")
    public String addNewUser(@RequestBody UserCredential user) {
        return service.saveUser(user);
    }

    @PostMapping("/auth/token")
    public Map<String, Object> getToken(@RequestBody AuthRequest authRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
        	String token = service.generateToken(authRequest.getUsername());
        	String role = service.getRoleByName(authRequest.getUsername());
        	Map<String, Object> response = new HashMap<>();
        	response.put("token", token);
        	response.put("role", role);
            return response;
        } else {
            throw new RuntimeException("Invalid access");
        }
    }

    @GetMapping("/auth/validate")
    public String validateToken(@RequestParam("token") String token) {
        service.validateToken(token);
        return "Token is valid";
    }
    
    @GetMapping("/user")
	public List<UserCredential> getAllUser(){
		return service.getAllUser();
	}
    
    @GetMapping("/user/{id}")
	public UserCredential getUserById(@PathVariable Integer id) {
		return service.getUserById(id);
	}
    
    @GetMapping("/user/name/{username}")
	public UserCredential getUserByName(@PathVariable String username) {
		return service.getUserByName(username);
	}
	
	@GetMapping("/user/role/{role}")
	public List<UserCredential> getUserByRole(@PathVariable String role) {
		return service.getUserByRole(role);
	}
	
	@PutMapping("/user/{id}")
	public UserCredential updateUser(@PathVariable Integer id, @RequestBody UserCredential user) {
		return service.updateUser(id, user);
	}
	
	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable Integer id) {
		service.deleteUser(id);
	}
}