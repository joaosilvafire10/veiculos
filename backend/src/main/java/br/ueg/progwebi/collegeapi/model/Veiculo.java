package br.ueg.progwebi.collegeapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo;
    private String chassi;
    private LocalDate dataFabricacao;
    private String placa;
    private Boolean vendido;
    private Long quilometragem;
}