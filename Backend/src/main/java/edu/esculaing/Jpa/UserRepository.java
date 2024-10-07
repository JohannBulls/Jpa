package edu.esculaing.Jpa;

import org.springframework.data.repository.CrudRepository;

/**
 * Repository interface for managing User entities.
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
