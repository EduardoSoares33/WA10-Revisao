package com.wa10.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wa10.api.model.Usuario;
import com.wa10.api.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
      
        Optional<Usuario> existente = usuarioRepository.findByCpf(usuario.getCpf());
        if (existente.isPresent() && !existente.get().getId().equals(usuario.getId())) {
            throw new RuntimeException("CPF já cadastrado para outro usuário!");
        }

        if (usuario.getSenhaHash() != null && !usuario.getSenhaHash().startsWith("$2a$")) {
            usuario.setSenhaHash(passwordEncoder.encode(usuario.getSenhaHash()));
        }

        return usuarioRepository.save(usuario);
    }
}