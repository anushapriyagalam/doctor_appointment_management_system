package com.doctorappointment.userservice.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.doctorappointment.userservice.entity.UserCredential;
import com.doctorappointment.userservice.exception.NotFoundException;
import com.doctorappointment.userservice.repository.UserCredentialRepository;

@Service
public class AuthServiceImpl implements AuthService {
	
	private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired
    private UserCredentialRepository repository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

	@Override
	public String saveUser(UserCredential credential) {
		credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        repository.save(credential);
        return "User added to the system";
	}

	@Override
	public String generateToken(String username) {
		return jwtService.generateToken(username);
	}

	@Override
	public void validateToken(String token) {
		jwtService.validateToken(token);
		
	}

	@Override
	public String getRoleByName(String name) {
		Optional<UserCredential> user = repository.findByName(name);
    	String role = user.get().getRole();
    	return role;
	}

	@Override
	public List<UserCredential> getAllUser() {
		try {
			List<UserCredential> user = repository.findAll();
            logger.info("Retrieved "+user.size()+" users");
            return user;
        } catch (Exception e) {
        	logger.error("Error retrieving all user");
            throw new RuntimeException("Error retrieving all user: " + e.getMessage(), e);
        }
	}

	@Override
	public UserCredential getUserById(Integer id) {
		try {
            Optional<UserCredential> optionalUser = repository.findById(id);
            if (optionalUser.isPresent()) {
            	UserCredential user = optionalUser.get();
                logger.info("Retrieved user by ID "+id);
                return user;
            } else {
                throw new NotFoundException("User with ID " + id + " does not exist");
            }
        } catch (NotFoundException e) {
        	logger.error("Error retrieving user by ID "+id);
            throw e;
        }
	}

	@Override
	public UserCredential getUserByName(String username) {
		try {
            Optional<UserCredential> optionalUser = repository.findByName(username);
            if (optionalUser.isPresent()) {
            	UserCredential user = optionalUser.get();
                logger.info("Retrieved user "+username);
                return user;
            } else {
                throw new NotFoundException("User with name " + username + " does not exist");
            }
        } catch (NotFoundException e) {
        	logger.error("Error retrieving user by name "+username);
            throw e;
        }
	}

	@Override
	public List<UserCredential> getUserByRole(String role) {
		List<UserCredential> user = repository.findByRole(role);
        if (user == null) {
            throw new NotFoundException("User with role " + role + " does not exist");
        }
        logger.info("Retrieved user by role "+role);
        return user;
	}

	@Override
	public UserCredential updateUser(Integer id, UserCredential user) {
		try {
            Optional<UserCredential> optionalUser = repository.findById(id);
            if (optionalUser.isPresent()) {
                UserCredential userDetails = optionalUser.get();
                userDetails.setName(user.getName());
                userDetails.setEmail(user.getEmail());
                userDetails.setAge(user.getAge());
                userDetails.setGender(user.getGender());
                userDetails.setPhoneNumber(user.getPhoneNumber());
                UserCredential updatedUser = repository.save(userDetails);
                logger.info("User updated successfully");
                return updatedUser;
            } else {
                throw new NotFoundException("User with ID " + id + " does not exist");
            }
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error updating user");
            throw new RuntimeException("Error updating user with ID " + id + ": " + e.getMessage(), e);
        }
	}

	@Override
	public void deleteUser(Integer id) {
		try {
            if (!repository.existsById(id)) {
                throw new NotFoundException("User with ID " + id + " not found");
            }
            repository.deleteById(id);
            logger.info("User with ID "+id+" deleted successfully");
        } catch (NotFoundException e) {
        	logger.error("Error deleting user with ID "+id);
            throw e;
        }
	}
	
}
