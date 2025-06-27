package br.ueg.progwebi.collegeapi.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VeiculoDataDTO {
    private Long id;
    private String modelo;
    private String chassi;
    private LocalDate dataFabricacao;
    private String placa;
    private Boolean vendido;
    private Long quilometragem;
}