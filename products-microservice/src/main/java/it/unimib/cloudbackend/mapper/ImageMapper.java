package it.unimib.cloudbackend.mapper;

import it.unimib.cloudbackend.entity.Image;
import it.unimib.cloudbackend.entity.ImageDTO;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ImageMapper {

    public static List<ImageDTO> toImageDTOList(List<Image> list) {
        return list.stream()
                .map(ImageMapper::toImageDTO)
                .sorted(Comparator.comparing(ImageDTO::getImageId))
                .collect(Collectors.toList());
    }

    public static ImageDTO toImageDTO(Image image) {
        return ImageDTO.builder()
                .imageId(image.getId())
                .imageName(image.getName())
                .imageLink(image.getImageLink())
                .productId(image.getProduct().getId())
                .build();
    }

}
