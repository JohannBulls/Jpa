package edu.esculaing.Jpa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
/**
 * Entity class representing a property.
 */
@Entity
public class Property {

    /**
     * Unique identifier for the property.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Address of the property.
     */
    private String address;

    /**
     * Price of the property.
     */
    private Double price;

    /**
     * Size of the property in square meters.
     */
    private Double size;

    /**
     * Description of the property.
     */
    private String description;

    /**
     * Default constructor required by JPA.
     */
    public Property() {}

    /**
     * Constructor to create a new property.
     *
     * @param address     Address of the property.
     * @param price       Price of the property.
     * @param size        Size of the property.
     * @param description Description of the property.
     */
    public Property(String address, Double price, Double size, String description) {
        this.address = address;
        this.price = price;
        this.size = size;
        this.description = description;
    }

    // Getters and Setters

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

    /**
     * Returns a string representation of the property.
     *
     * @return String representation of the property.
     */
    @Override
    public String toString() {
        return String.format(
                "Property[id=%d, address='%s', price=%.2f, size=%.2f, description='%s']",
                id, address, price, size, description);
    }
}
