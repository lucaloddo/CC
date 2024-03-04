package it.unimib.cloudbackend.repository;

import it.unimib.cloudbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public interface ProductRepository extends JpaRepository<Product, Long> {

}
