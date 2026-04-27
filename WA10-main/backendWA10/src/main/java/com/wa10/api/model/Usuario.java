package com.wa10.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; 
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // informa ao spring que essa classe é uma tabela no banco de dados
@Table(name = "usuario") //define o nome da tabela como usuario
@Getter @Setter // atalho para o lombok criar get e set automaticamente
@NoArgsConstructor // esvazia o construtor para facilitar o funcionamento inicial do Hibernate
@AllArgsConstructor //cria um construtor com todos campos
public class Usuario {

    @Id // define o id como chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-Incremento
    private Long id;

    @Column(unique = true, nullable = false, length = 14) 
    private String cpf;

    @Column(nullable = false) //not null
    private String nome;

    @Column(unique = true) //unique
    private String email;

    private String telefone;

    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    private String cep;
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;


}