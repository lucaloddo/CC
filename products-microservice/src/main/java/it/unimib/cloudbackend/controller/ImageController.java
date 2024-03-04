package it.unimib.cloudbackend.controller;

import it.unimib.cloudbackend.entity.Image;
import it.unimib.cloudbackend.entity.ImageDTO;
import it.unimib.cloudbackend.entity.Product;
import it.unimib.cloudbackend.mapper.ImageMapper;
import it.unimib.cloudbackend.repository.ImageRepository;
import it.unimib.cloudbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/{productId}")
    public ResponseEntity<List<ImageDTO>> getImagesByProductId(@PathVariable Long productId) {
        if (productId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Product> optProduct = productRepository.findById(productId);
        return optProduct.map(product -> new ResponseEntity<>(ImageMapper.toImageDTOList(product.getImages()), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<ImageDTO> postImage(@RequestBody ImageDTO imageDTO) {
        if (imageDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (imageDTO.getProductId() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (imageDTO.getImageLink() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Product> optProduct = productRepository.findById(imageDTO.getProductId());
        if (optProduct.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Product product = optProduct.get();
        Image image = Image.builder()
                .name(imageDTO.getImageName())
                .imageLink(imageDTO.getImageLink())
                .product(product)
                .build();
        return new ResponseEntity<>(ImageMapper.toImageDTO(imageRepository.save(image)), HttpStatus.CREATED);
    }

}
