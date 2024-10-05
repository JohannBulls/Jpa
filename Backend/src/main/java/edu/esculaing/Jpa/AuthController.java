package edu.esculaing.Jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Usuario ya registrado";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Usuario registrado correctamente";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user != null) {
            System.out.println("Contraseña ingresada en texto plano: " + loginRequest.getPassword());
            System.out.println("Hash en la base de datos: " + user.getPassword());
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                System.out.println("¡Contraseña correcta!");
                return "Login exitoso";
            } else {
                System.out.println("Contraseña incorrecta");
                return "Credenciales inválidas";
            }
        } else {
            System.out.println("Usuario no encontrado");
            return "Usuario no encontrado";
        }
    }
}
