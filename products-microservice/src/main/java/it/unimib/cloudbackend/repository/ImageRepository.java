package it.unimib.cloudbackend.repository;

import it.unimib.cloudbackend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public interface ImageRepository extends JpaRepository<Image, Long> {

}
