package it.unimib.cloudbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {

    private Long imageId;
    private Long productId;
    private String imageName;
    private String imageLink;

}
