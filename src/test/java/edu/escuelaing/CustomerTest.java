package edu.escuelaing;

import org.junit.jupiter.api.Test;

import edu.esculaing.Jpa.Customer;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the Customer entity class.
 */
public class CustomerTest {

    /**
     * Test to verify that the constructor and getters of the Customer class 
     * work as expected.
     */
    @Test
    public void testConstructorAndGetters() {
        // Arrange: Create a new Customer object
        Customer customer = new Customer("John", "Doe");

        // Assert: Verify that the getters return the correct values
        assertEquals("John", customer.getFirstName());
        assertEquals("Doe", customer.getLastName());
    }

    /**
     * Test to verify the correct functionality of the toString method 
     * in the Customer class.
     */
    @Test
    public void testToString() {
        // Arrange: Create a new Customer object
        Customer customer = new Customer("Jane", "Smith");

        // Act: Call the toString method
        String result = customer.toString();

        // Assert: Verify that the string representation contains the correct data
        assertTrue(result.contains("Jane"));
        assertTrue(result.contains("Smith"));
    }

    /**
     * Test to verify the behavior of the default constructor in the Customer class.
     * As the default constructor is protected, this test can only be executed 
     * if it is in the same package as the Customer class.
     */
    @Test
    public void testDefaultConstructor() {
        // Arrange & Act: Create a new Customer using the default constructor
        Customer customer = new Customer();

        // Assert: Verify that the default values are null
        assertNull(customer.getFirstName());
        assertNull(customer.getLastName());
    }
}
