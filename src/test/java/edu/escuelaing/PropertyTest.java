package edu.escuelaing;

import org.junit.jupiter.api.Test;

import edu.esculaing.Jpa.Property;

import static org.junit.jupiter.api.Assertions.*;
/**
 * Unit tests for the Property entity class.
 */
public class PropertyTest {

    /**
     * Test to verify that the constructor and getters work correctly.
     * It checks that the property fields are correctly initialized and 
     * that the getter methods return the expected values.
     */
    @Test
    public void testConstructorAndGetters() {
        // Arrange: Create a new Property object
        Property property = new Property("123 Main St", 250000.0, 120.0, "Nice house with garden");

        // Assert: Check if the getters return the expected values
        assertEquals("123 Main St", property.getAddress());
        assertEquals(250000.0, property.getPrice());
        assertEquals(120.0, property.getSize());
        assertEquals("Nice house with garden", property.getDescription());
    }

    /**
     * Test to verify that the setter methods correctly update the property fields.
     * It checks that the values are updated properly when using the setters.
     */
    @Test
    public void testSetters() {
        // Arrange: Create a Property object and update its fields
        Property property = new Property("123 Main St", 250000.0, 120.0, "Nice house with garden");

        // Act: Modify the property attributes
        property.setAddress("456 Oak St");
        property.setPrice(300000.0);
        property.setSize(150.0);
        property.setDescription("Modern house with pool");

        // Assert: Verify that the setters updated the values correctly
        assertEquals("456 Oak St", property.getAddress());
        assertEquals(300000.0, property.getPrice());
        assertEquals(150.0, property.getSize());
        assertEquals("Modern house with pool", property.getDescription());
    }

    /**
     * Test to verify that the toString method returns a string representation of the property
     * that contains the correct values for all the fields.
     */
    @Test
    public void testToString() {
        // Arrange: Create a new Property object
        Property property = new Property("123 Main St", 250000.0, 120.0, "Nice house with garden");

        // Act: Call the toString method
        String result = property.toString();

        // Assert: Verify that the string representation is correct
        assertTrue(result.contains("123 Main St"));
        assertTrue(result.contains("250000"));
        assertTrue(result.contains("120"));
        assertTrue(result.contains("Nice house with garden"));
    }

    /**
     * Test to verify that the default constructor initializes a Property object
     * with null or default values.
     */
    @Test
    public void testDefaultConstructor() {
        // Arrange & Act: Create a Property object using the default constructor
        Property property = new Property();

        // Assert: Verify that the default constructor creates an object with null or default values
        assertNull(property.getAddress());
        assertNull(property.getPrice());
        assertNull(property.getSize());
        assertNull(property.getDescription());
    }
}
