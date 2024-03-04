package it.unimib.cloudbackend.controller;

import it.unimib.cloudbackend.entity.Supplier;
import it.unimib.cloudbackend.entity.SupplierDTO;
import it.unimib.cloudbackend.mapper.SupplierMapper;
import it.unimib.cloudbackend.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    @Autowired
    SupplierRepository supplierRepository;

    @GetMapping
    public ResponseEntity<List<SupplierDTO>> getAllSuppliers() {
        return new ResponseEntity<>(SupplierMapper.toSupplierDTOList(supplierRepository.findAll()), HttpStatus.OK);
    }

    @GetMapping("/{supplierId}")
    public ResponseEntity<SupplierDTO> getSupplierById(@PathVariable Long supplierId) {
        Optional<Supplier> optSupplier = supplierRepository.findById(supplierId);
        return optSupplier.map(supplier -> new ResponseEntity<>(SupplierMapper.toSupplierDTO(supplier), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Supplier> postSupplier(@RequestBody SupplierDTO supplierDTO) {
        if (supplierDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Supplier supplier = Supplier.builder()
                .contactName(supplierDTO.getContactName())
                .phoneNumber(supplierDTO.getPhoneNumber())
                .contactEmail(supplierDTO.getContactEmail())
                .name(supplierDTO.getName())
                .build();
        return new ResponseEntity<>(supplierRepository.save(supplier), HttpStatus.CREATED);
    }

    @PutMapping("/{supplierId}")
    public ResponseEntity<Supplier> updateSupplier(
            @PathVariable Long supplierId,
            @RequestBody SupplierDTO supplierDTO
    ) {
        if (supplierId == null || supplierDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Supplier> optSupplier = supplierRepository.findById(supplierId);
        if (optSupplier.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Supplier supplier = optSupplier.get();
        supplier.setName(supplierDTO.getName() == null ? supplier.getName() : supplierDTO.getName());
        supplier.setContactEmail(supplierDTO.getContactEmail() == null ? supplier.getContactEmail() : supplierDTO.getContactEmail());
        supplier.setContactName(supplierDTO.getContactName() == null ? supplier.getContactName() : supplierDTO.getContactName());
        supplier.setPhoneNumber(supplierDTO.getPhoneNumber() == null ? supplier.getPhoneNumber() : supplierDTO.getPhoneNumber());
        return new ResponseEntity<>(supplierRepository.save(supplier), HttpStatus.OK);
    }

    @DeleteMapping("/{supplierId}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Long supplierId) {
        if (supplierId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Supplier> optSupplier = supplierRepository.findById(supplierId);
        if (optSupplier.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        supplierRepository.deleteById(supplierId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
