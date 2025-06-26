package br.ueg.progwebi.collegeapi.service.impl;

import br.ueg.progwebi.collegeapi.model.Veiculo;
import br.ueg.progwebi.collegeapi.repository.VeiculoRepository;
import br.ueg.progwebi.collegeapi.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoServiceImpl implements VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Override
    public List<Veiculo> listAll() {
        return veiculoRepository.findAll();
    }

    @Override
    public Veiculo getById(Long id) {
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado com ID: " + id));
    }

    @Override
    public Veiculo create(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    @Override
    public Veiculo update(Long id, Veiculo veiculoAtualizado) {
        Veiculo veiculoExistente = getById(id);
        veiculoExistente.setModelo(veiculoAtualizado.getModelo());
        veiculoExistente.setChassi(veiculoAtualizado.getChassi());
        veiculoExistente.setDataFabricacao(veiculoAtualizado.getDataFabricacao());
        veiculoExistente.setPlaca(veiculoAtualizado.getPlaca());
        veiculoExistente.setVendido(veiculoAtualizado.getVendido());
        veiculoExistente.setQuilometragem(veiculoAtualizado.getQuilometragem());

        return veiculoRepository.save(veiculoExistente);
    }

    @Override
    public void delete(Long id) {
        veiculoRepository.deleteById(id);
    }
}
