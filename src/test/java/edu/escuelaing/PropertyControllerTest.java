package edu.escuelaing;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import edu.esculaing.Jpa.Property;
import edu.esculaing.Jpa.PropertyController;
import edu.esculaing.Jpa.PropertyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
/**
 * Unit tests for the PropertyController class, which manages Property entities.
 * It mocks the PropertyRepository to isolate the behavior of the controller methods.
 */
public class PropertyControllerTest {

    @InjectMocks
    private PropertyController propertyController;

    @Mock
    private PropertyRepository propertyRepository;

    /**
     * Sets up the test environment, initializing Mockito mocks and injecting them
     * into the controller.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify that the getAllProperties method correctly retrieves all properties.
     * It mocks the repository to return a predefined list of properties and checks
     * the size of the returned list.
     */
    @Test
    public void testGetAllProperties() {
        // Arrange: Create a list of properties to be returned by the repository
        List<Property> properties = new ArrayList<>();
        properties.add(new Property("Address 1", 100000.0, 100.0, "Description 1"));
        properties.add(new Property("Address 2", 200000.0, 200.0, "Description 2"));

        when(propertyRepository.findAll()).thenReturn(properties);

        // Act: Call the method in the controller
        List<Property> result = propertyController.getAllProperties();

        // Assert: Check the result size and verify repository interaction
        assertEquals(2, result.size());
        verify(propertyRepository, times(1)).findAll();
    }

    /**
     * Test to verify that the getPropertyById method retrieves the correct property by ID.
     * It mocks the repository to return a property when the ID is found.
     */
    @Test
    public void testGetPropertyById() {
        // Arrange: Create a property to be returned by the repository
        Property property = new Property("Address", 100000.0, 100.0, "Description");
        when(propertyRepository.findById(1L)).thenReturn(Optional.of(property));

        // Act: Call the method in the controller
        Property result = propertyController.getPropertyById(1L);

        // Assert: Check the returned property and verify repository interaction
        assertNotNull(result);
        assertEquals("Address", result.getAddress());
        verify(propertyRepository, times(1)).findById(1L);
    }

    /**
     * Test to verify that the createProperty method saves a new property.
     * It mocks the repository to save the property and return the saved instance.
     */
    @Test
    public void testCreateProperty() {
        // Arrange: Create a property to be saved
        Property property = new Property("Address", 150000.0, 150.0, "Description");
        when(propertyRepository.save(property)).thenReturn(property);

        // Act: Call the method in the controller
        Property result = propertyController.createProperty(property);

        // Assert: Verify the saved property and repository interaction
        assertNotNull(result);
        assertEquals(150000.0, result.getPrice());
        verify(propertyRepository, times(1)).save(property);
    }

    /**
     * Test to verify that the updateProperty method updates an existing property.
     * It mocks the repository to find the property by ID, update its values, and save it.
     */
    @Test
    public void testUpdateProperty() {
        // Arrange: Create an existing property and an updated property
        Property existingProperty = new Property("Old Address", 100000.0, 100.0, "Old Description");
        Property updatedProperty = new Property("New Address", 200000.0, 200.0, "New Description");

        when(propertyRepository.findById(1L)).thenReturn(Optional.of(existingProperty));
        when(propertyRepository.save(existingProperty)).thenReturn(existingProperty);

        // Act: Call the update method
        Property result = propertyController.updateProperty(1L, updatedProperty);

        // Assert: Verify the updated values and repository interaction
        assertNotNull(result);
        assertEquals("New Address", result.getAddress());
        assertEquals(200000.0, result.getPrice());
        verify(propertyRepository, times(1)).findById(1L);
        verify(propertyRepository, times(1)).save(existingProperty);
    }

    /**
     * Test to verify that the deleteProperty method deletes a property by its ID.
     * It mocks the repository to ensure the correct method is called.
     */
    @Test
    public void testDeleteProperty() {
        // Act: Call the delete method in the controller
        propertyController.deleteProperty(1L);

        // Assert: Verify the repository interaction for deletion
        verify(propertyRepository, times(1)).deleteById(1L);
    }
}
