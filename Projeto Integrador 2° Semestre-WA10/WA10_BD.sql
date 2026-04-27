CREATE TABLE usuario (
    cpf VARCHAR(14) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL,     
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cpf)
);

CREATE TABLE documento (
    id BIGINT AUTO_INCREMENT NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho_arquivo VARCHAR(500) NOT NULL,
    data_envio DATETIME NOT NULL,
    tipo_documento VARCHAR(50) NOT NULL,    
    usuario_cpf VARCHAR(14) NOT NULL,    
    PRIMARY KEY (id),
    CONSTRAINT fk_documento_usuario 
        FOREIGN KEY (usuario_cpf) 
        REFERENCES usuario (cpf)
        ON UPDATE CASCADE
);