package edu.esculaing.Jpa;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 * Repository interface for managing Property entities.
 */
public interface PropertyRepository extends CrudRepository<Property, Long> {
    List<Property> findByAddress(String address);
}
