package edu.esculaing.Jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String responseMessage = authService.registerUser(user);
        if (responseMessage.equals("Usuario ya registrado")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        boolean isAuthenticated = authService.authenticateUser(loginRequest);
        if (isAuthenticated) {
            return new ResponseEntity<>("Login exitoso", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciales inválidas", HttpStatus.UNAUTHORIZED);
        }
    }
}
