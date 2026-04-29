package com.wa10.api.repository;

import com.wa10.api.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    
    /**
     * Busca um documento pelo seu identificador único universal (UUID).
     * Utilizado para operações de download seguras.
     */
    Optional<Documento> findByUuid(String uuid);
    
}
