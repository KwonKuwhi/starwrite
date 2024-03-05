package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import starwrite.server.entity.Person;

public interface PersonRepository extends Neo4jRepository<Person, Long> {

  Person findByName(String name);

  List<Person> findByTeammatesName(String name);
}
