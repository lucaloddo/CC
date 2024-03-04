package it.unimib.cloudbackend.controller;

import it.unimib.cloudbackend.entity.Category;
import it.unimib.cloudbackend.entity.CategoryDTO;
import it.unimib.cloudbackend.mapper.CategoryMapper;
import it.unimib.cloudbackend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return new ResponseEntity<>(CategoryMapper.toCategoryDTOList(categoryRepository.findAll()), HttpStatus.OK);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long categoryId) {
        Optional<Category> optCategory = categoryRepository.findById(categoryId);
        return optCategory.map(category -> new ResponseEntity<>(CategoryMapper.toCategoryDTO(category), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> postCategory(@RequestBody CategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Category category = Category.builder()
                .name(categoryDTO.getName())
                .build();
        return new ResponseEntity<>(CategoryMapper.toCategoryDTO(categoryRepository.save(category)), HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable Long categoryId,
            @RequestBody CategoryDTO categoryDTO
    ) {
        if (categoryId == null || categoryDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Category> optCategory = categoryRepository.findById(categoryId);
        if (optCategory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Category category = optCategory.get();
        category.setName(categoryDTO.getName() == null ? category.getName() : categoryDTO.getName());
        return new ResponseEntity<>(CategoryMapper.toCategoryDTO(categoryRepository.save(category)), HttpStatus.OK);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        if (categoryId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Category> optCategory = categoryRepository.findById(categoryId);
        if (optCategory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        categoryRepository.deleteById(categoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
