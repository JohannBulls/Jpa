package edu.esculaing.Jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registers a new user by encrypting their password and saving them to the
     * database.
     * 
     * @param user The user to register.
     * @return A message indicating success or failure.
     */
    public String registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Usuario ya registrado";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Usuario registrado correctamente";
    }

    /**
     * Authenticates a user by comparing the password with the stored hash.
     * 
     * @param loginRequest The login request containing the username and password.
     * @return A boolean indicating if the authentication was successful.
     */
    public boolean authenticateUser(User loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user != null) {
            System.out.println("Contraseña ingresada: " + loginRequest.getPassword());
            System.out.println("Hash almacenado: " + user.getPassword());
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return true;
            }
        }
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return true;
        }
        return false;
    }

}
