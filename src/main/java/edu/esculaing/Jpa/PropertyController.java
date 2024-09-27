package edu.esculaing.Jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * REST controller for managing properties.
 */
@RestController
@RequestMapping("/properties")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    /**
     * Get all properties.
     *
     * @return List of all properties.
     */
    @GetMapping
    public List<Property> getAllProperties() {
        return (List<Property>) propertyRepository.findAll();
    }

    /**
     * Get a specific property by its ID.
     *
     * @param id The ID of the property.
     * @return The property with the given ID, or null if not found.
     */
    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyRepository.findById(id).orElse(null);
    }

    /**
     * Create a new property.
     *
     * @param property The property to be created.
     * @return The created property.
     */
    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyRepository.save(property);
    }

    /**
     * Update an existing property.
     *
     * @param id The ID of the property to update.
     * @param property The updated property data.
     * @return The updated property, or null if the property was not found.
     */
    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        Property existingProperty = propertyRepository.findById(id).orElse(null);
        if (existingProperty != null) {
            existingProperty.setAddress(property.getAddress());
            existingProperty.setPrice(property.getPrice());
            existingProperty.setSize(property.getSize());
            existingProperty.setDescription(property.getDescription());
            return propertyRepository.save(existingProperty);
        }
        return null;
    }

    /**
     * Delete a property by its ID.
     *
     * @param id The ID of the property to delete.
     */
    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyRepository.deleteById(id);
    }
}
