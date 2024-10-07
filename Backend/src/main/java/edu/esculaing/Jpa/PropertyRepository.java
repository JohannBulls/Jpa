package edu.esculaing.Jpa;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 * Repository interface for managing Property entities.
 * Extends the CrudRepository interface to provide CRUD operations for Property entities.
 */
public interface PropertyRepository extends CrudRepository<Property, Long> {

    /**
     * Finds properties by their address.
     *
     * @param address The address of the properties to find.
     * @return A list of Property objects with the matching address.
     */
    List<Property> findByAddress(String address);
}
