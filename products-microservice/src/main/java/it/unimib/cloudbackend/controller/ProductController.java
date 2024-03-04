package it.unimib.cloudbackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.unimib.cloudbackend.entity.Category;
import it.unimib.cloudbackend.entity.Product;
import it.unimib.cloudbackend.entity.ProductDTO;
import it.unimib.cloudbackend.entity.Supplier;
import it.unimib.cloudbackend.mapper.ProductMapper;
import it.unimib.cloudbackend.repository.CategoryRepository;
import it.unimib.cloudbackend.repository.ProductRepository;
import it.unimib.cloudbackend.repository.SupplierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    SupplierRepository supplierRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Logger LOG = LoggerFactory.getLogger(ProductController.class);

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return new ResponseEntity<>(ProductMapper.toProductDTOList(productRepository.findAll()), HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        Optional<Product> optProduct = productRepository.findById(productId);
        return optProduct.map(product -> new ResponseEntity<>(ProductMapper.toProductDTO(product), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> postProduct(
            @RequestParam Long categoryId,
            @RequestParam Long supplierId,
            @RequestBody ProductDTO productDTO
    ) {
        if (categoryId == null || supplierId == null || productDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<Category> optCategory = categoryRepository.findById(categoryId);
        if (optCategory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<Supplier> optSupplier = supplierRepository.findById(supplierId);
        if (optSupplier.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Product product = Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .stockQuantity(productDTO.getStockQuantity())
                .category(optCategory.get())
                .supplier(optSupplier.get())
                .build();

        return new ResponseEntity<>(ProductMapper.toProductDTO(productRepository.save(product)), HttpStatus.CREATED);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long productId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long supplierId,
            @RequestBody ProductDTO productDTO
    ) {
        if (productId == null || productDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<Product> optProduct = productRepository.findById(productId);
        if (optProduct.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Product product = optProduct.get();
        product.setName(productDTO.getName() == null ? product.getName() : productDTO.getName());
        product.setPrice(productDTO.getPrice() == null ? product.getPrice() : productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity() == null ? product.getStockQuantity() : productDTO.getStockQuantity());

        if (categoryId != null) {
            Optional<Category> optCategory = categoryRepository.findById(categoryId);
            if (optCategory.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            product.setCategory(optCategory.get());
        }

        if (supplierId != null) {
            Optional<Supplier> optSupplier = supplierRepository.findById(supplierId);
            if (optSupplier.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            product.setSupplier(optSupplier.get());
        }

        return new ResponseEntity<>(ProductMapper.toProductDTO(productRepository.save(product)), HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        if (productId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Product> optProduct = productRepository.findById(productId);
        if (optProduct.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productRepository.deleteById(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
