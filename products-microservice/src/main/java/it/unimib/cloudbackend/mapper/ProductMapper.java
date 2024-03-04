package it.unimib.cloudbackend.mapper;

import it.unimib.cloudbackend.entity.CategoryDTO;
import it.unimib.cloudbackend.entity.Product;
import it.unimib.cloudbackend.entity.ProductDTO;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {

    public static List<ProductDTO> toProductDTOList(List<Product> list) {
        return list.stream()
                .map(ProductMapper::toProductDTO)
                .sorted(Comparator.comparing(ProductDTO::getId))
                .collect(Collectors.toList());
    }

    public static ProductDTO toProductDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .category(CategoryMapper.toCategoryDTO(product.getCategory()))
                .supplier(SupplierMapper.toSupplierDTO(product.getSupplier()))
                .build();
    }

}
