package it.unimib.cloudbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private Double price;
    private Integer stockQuantity;
    private CategoryDTO category;
    private SupplierDTO supplier;

}
