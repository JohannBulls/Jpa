package edu.esculaing.Jpa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class for running the Spring Boot application.
 * It initializes the application context and runs the application.
 */
@SpringBootApplication
public class AccessingDataJpaApplication {

    /**
     * Main method to run the Spring Boot application.
     *
     * @param args Command-line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(AccessingDataJpaApplication.class, args);
    }
}
