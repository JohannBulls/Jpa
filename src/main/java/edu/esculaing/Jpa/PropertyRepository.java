package edu.esculaing.Jpa;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PropertyRepository extends CrudRepository<Property, Long> {
  List<Property> findByAddress(String address);
}
