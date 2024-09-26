package edu.esculaing.Jpa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Property {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  
  private String address;
  private Double price;
  private Double size;
  private String description;

  protected Property() {}

  public Property(String address, Double price, Double size, String description) {
    this.address = address;
    this.price = price;
    this.size = size;
    this.description = description;
  }

  // Getters y Setters
  public Long getId() {
    return id;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public Double getSize() {
    return size;
  }

  public void setSize(Double size) {
    this.size = size;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return String.format(
        "Property[id=%d, address='%s', price=%.2f, size=%.2f, description='%s']",
        id, address, price, size, description);
  }
}
