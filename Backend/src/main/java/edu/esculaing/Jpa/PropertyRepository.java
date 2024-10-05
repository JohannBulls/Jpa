package edu.esculaing.Jpa;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

/**
 * Repository interface for managing Property entities.
 */
public interface PropertyRepository extends CrudRepository<Property, Long> {

  /**
   * Find properties by their address.
   *
   * @param address The address to search for.
   * @return List of properties that match the given address.
   */
  List<Property> findByAddress(String address);
}
