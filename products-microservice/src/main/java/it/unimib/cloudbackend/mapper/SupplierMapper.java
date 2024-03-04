package it.unimib.cloudbackend.mapper;

import it.unimib.cloudbackend.entity.CategoryDTO;
import it.unimib.cloudbackend.entity.Supplier;
import it.unimib.cloudbackend.entity.SupplierDTO;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SupplierMapper {

    public static List<SupplierDTO> toSupplierDTOList(List<Supplier> list) {
        return list.stream()
                .map(SupplierMapper::toSupplierDTO)
                .sorted(Comparator.comparing(SupplierDTO::getId))
                .collect(Collectors.toList());
    }

    public static SupplierDTO toSupplierDTO(Supplier supplier) {
        return SupplierDTO.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .contactEmail(supplier.getContactEmail())
                .contactName(supplier.getContactName())
                .phoneNumber(supplier.getPhoneNumber())
                .build();
    }

}
