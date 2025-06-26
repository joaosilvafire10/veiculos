package br.ueg.progwebi.collegeapi.repository;

import br.ueg.progwebi.collegeapi.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    Optional<Veiculo> findByChassi(String chassi);

    Optional<Veiculo> findByPlaca(String placa);

    boolean existsByChassi(String chassi);

    boolean existsByPlaca(String placa);

    Optional<Veiculo> findTopByOrderByIdDesc();
}
