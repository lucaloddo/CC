package it.unimib.cloudbackend.mapper;

import it.unimib.cloudbackend.entity.Category;
import it.unimib.cloudbackend.entity.CategoryDTO;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {

    public static List<CategoryDTO> toCategoryDTOList(List<Category> list) {
        return list.stream()
                .map(CategoryMapper::toCategoryDTO)
                .sorted(Comparator.comparing(CategoryDTO::getId))
                .collect(Collectors.toList());
    }

    public static CategoryDTO toCategoryDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

}
