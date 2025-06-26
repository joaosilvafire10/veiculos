package br.ueg.progwebi.collegeapi.controller;

import br.ueg.progwebi.collegeapi.dto.VeiculoDataDTO;
import br.ueg.progwebi.collegeapi.model.Veiculo;
import br.ueg.progwebi.collegeapi.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/veiculo")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public ResponseEntity<List<Veiculo>> listAll() {
        return ResponseEntity.ok(veiculoService.listAll());
    }

    @PostMapping
    public ResponseEntity<Veiculo> create(@RequestBody VeiculoDataDTO veiculoDTO) {
        Veiculo novoVeiculo = veiculoDTOToModel(veiculoDTO);
        return ResponseEntity.ok(veiculoService.create(novoVeiculo));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Veiculo> update(@PathVariable Long id, @RequestBody VeiculoDataDTO veiculoDTO) {
        Veiculo veiculoAtualizado = veiculoDTOToModel(veiculoDTO);
        return ResponseEntity.ok(veiculoService.update(id, veiculoAtualizado));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Veiculo> getById(@PathVariable Long id) {
        return ResponseEntity.ok(veiculoService.getById(id));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        veiculoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private static Veiculo veiculoDTOToModel(VeiculoDataDTO veiculoDTO) {
        return Veiculo.builder()
                .modelo(veiculoDTO.getModelo())
                .chassi(veiculoDTO.getChassi())
                .dataFabricacao(veiculoDTO.getDataFabricacao())
                .placa(veiculoDTO.getPlaca())
                .vendido(veiculoDTO.getVendido())
                .quilometragem(veiculoDTO.getQuilometragem())
                .build();
    }
}