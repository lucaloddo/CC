package it.unimib.cloudbackend.repository;

import it.unimib.cloudbackend.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(origins = "*")
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}
