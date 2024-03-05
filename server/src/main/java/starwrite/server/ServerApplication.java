package starwrite.server;

import java.util.Arrays;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import starwrite.server.entity.Person;
import starwrite.server.repository.PersonRepository;

@SpringBootApplication
public class ServerApplication {

  private final static Logger log = LoggerFactory.getLogger(ServerApplication.class);

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
    System.exit(0);
  }

  @Bean
  CommandLineRunner demo(PersonRepository personRepository) {
    return args -> {

      personRepository.deleteAll();

      Person greg = new Person("Greg");
      Person roy = new Person("Roy");
      Person craig = new Person("Craig");

      List<Person> team = Arrays.asList(greg, roy, craig);

      log.info("Before linking up with Neo4j...");

      team.stream().forEach(person -> log.info("\t" + person.toString()));

      personRepository.save(greg);
      personRepository.save(roy);
      personRepository.save(craig);

      greg = personRepository.findByName(greg.getName());
      greg.worksWith(roy);
      greg.worksWith(craig);
      personRepository.save(greg);

      roy = personRepository.findByName(roy.getName());
      roy.worksWith(craig);
      // We already know that roy works with greg
      personRepository.save(roy);

      // We already know craig works with roy and greg

      log.info("Lookup each person by name...");
      team.stream().forEach(person -> log.info(
          "\t" + personRepository.findByName(person.getName()).toString()));

      List<Person> teammates = personRepository.findByTeammatesName(greg.getName());
      log.info("The following have Greg as a teammate...");
      teammates.stream().forEach(person -> log.info("\t" + person.getName()));
    };
  }

}
