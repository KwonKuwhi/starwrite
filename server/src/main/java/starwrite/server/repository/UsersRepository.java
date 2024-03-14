package starwrite.server.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import starwrite.server.entity.Users;

public interface UsersRepository extends
    Neo4jRepository<Users, String> { // pk가 long 타입이므로 long 도 추가
//    Optional<Users> findByEmail(String email);

    @Query("MATCH (u:Users) WHERE u.mail = $mail RETURN u LIMIT 1")
    Users findUserByEmail(@Param(value = "mail") String mail);


    // 해당 유저 아이디에 대한 유저 아이디 반환
    @Query("MATCH (u:Users) WHERE u.userId = $userId RETURN u.userId")
    String findUserById(@Param(value = "userId") String userId);

    @Query("MATCH (u:Users) WHERE u.userId = $userId RETURN u LIMIT 1")
    Users findUserByUserId(@Param(value = "userId") String userId);

    @Query("MATCH (u:Users) WHERE u.nickname = $nickname return u.userId")
    String findUserByNickname(@Param(value = "nickname") String nickname);
}

