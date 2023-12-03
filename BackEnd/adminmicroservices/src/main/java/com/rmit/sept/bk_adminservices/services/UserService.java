package com.rmit.sept.bk_adminservices.services;



import com.rmit.sept.bk_adminservices.Repositories.BookRepository;
import com.rmit.sept.bk_adminservices.Repositories.UserRepository;
import com.rmit.sept.bk_adminservices.exceptions.BookNameAlreadyExistsException;
import com.rmit.sept.bk_adminservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_adminservices.model.Book;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser) {

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }

    public User editUser (User editUser) {

        try {
            // When admin edit user account, original password could be saved in hash format if the password hasn't changed.
            if (editUser.getPassword().length() > 50) {
                editUser.setPassword(bCryptPasswordEncoder.encode(editUser.getPassword()));
            }
            User user = userRepository.findByUsername(editUser.getUsername());
            user.setABN(editUser.getABN());
            user.setAddress(editUser.getAddress());
            user.setPhoneNumber(editUser.getPhoneNumber());
            user.setUserRole(editUser.getUserRole());
            user.setPassword(editUser.getPassword());
            user.setConfirmPassword(editUser.getConfirmPassword());
            user.setFullName(editUser.getFullName());

            return userRepository.save(user);

        } catch (Exception e) {
            return null;
        }
    }

    public List<User> getAllNonAdminPendingUsers(Boolean pending) {
        List<User> users = new ArrayList<User>();
        for (User user : userRepository.findAll()) {
            if(!user.getUserRole().equals(UserRole.ADMIN) && user.isPending() == pending) {
                users.add(user);
            }
        }
        return users;
    }

    public User findByusername(String username) {
        return userRepository.findByUsername(username);
    }

    public User approvePendingUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        user.setPending(false);
        userRepository.save(user);
        return user;
    }

    public void rejectPendingUser(User user) {
        userRepository.delete(user);
    }

    public void blockUser(String username) {
        User user = userRepository.findByUsername(username);
        user.setPending(true);
        userRepository.save(user);
    }
}
