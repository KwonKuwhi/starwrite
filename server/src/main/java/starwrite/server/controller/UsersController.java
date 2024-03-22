package starwrite.server.controller;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Users;
import starwrite.server.repository.UsersRepository;

@RestController
public class UsersController {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/register/user")
    public String createUser(@RequestBody Users user) {
        System.out.println("createUser >>>>>>>>>>>> " + user);
        // db에 넣기 전에 비밀번화 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(user.getCreatedAt());

//        return usersRepository.createUser(user.getLogin_type(), user.getMail(), user.getSocialId(),
//            user.getPassword(), user.getProfile_img(), user.getNickname(), user.getRole(),
//            user.getCreatedAt(), user.getUpdatedAt());
        try {
          usersRepository.save(user);
          return "유저 생성되었음";
        } catch(Exception e) {
          return e.getLocalizedMessage();
      }
    }

}
