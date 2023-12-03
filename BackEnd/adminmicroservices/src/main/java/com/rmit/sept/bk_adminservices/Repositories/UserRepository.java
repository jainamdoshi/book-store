package com.rmit.sept.bk_adminservices.Repositories;

import com.rmit.sept.bk_adminservices.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// All database queries including all crud queries

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
}
