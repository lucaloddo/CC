package it.unimib.cloudbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {

    private Long id;
    private String name;
    private String contactName;
    private String contactEmail;
    private String phoneNumber;

}
