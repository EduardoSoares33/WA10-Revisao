package backendWA10;

import java.io.File;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Service {
	private final List<Usuario> repositorioUsuarios = new ArrayList<>();
	private String hashSenha(String senha) {
		return String.valueOf(senha.hashCode());
	}
	
	 public void criarEArmazenarUsuario(String cpf, String senhaPura, TipoUsuario tipoUsuario) {
	        String hash = hashSenha(senhaPura); //O service pode chamar o método privado
	        Usuario novoUsuario = new Usuario(cpf, hash, tipoUsuario);
	        repositorioUsuarios.add(novoUsuario);
	    }
	
	public void adicionarUsuario(Usuario usuario) {
        repositorioUsuarios.add(usuario);
    }
	
	public Usuario realizarLogin(String cpf, String senhaFornecida) {
        String senhaHashFornecido = hashSenha(senhaFornecida);
        //Busca no repositório em memória
        for (Usuario usuarioSalvo : repositorioUsuarios) {
            if (usuarioSalvo.getCpf().equals(cpf) && usuarioSalvo.getSenhaHash().equals(senhaHashFornecido)) {
                return usuarioSalvo; //Retorna o objeto Usuario se o login for válido
            }
        }
		return null; //Retorna null se não encontrar ou a senha estiver errada
	}
	
	public void enviarDocumento() {
		System.out.println("Documento enviado.");
	}
	
	public File baixarDocumento() {
		System.out.println("Baixando Documento...");
		return new File("documento.pdf");
	}
	
	public void editarEnvio(Usuario usuario) {
        if (usuario.getTipoUsuario() == TipoUsuario.ADMINISTRADOR) {
            System.out.println("Edição de envio realizada por ADMIN.");
        } else {
            System.out.println("Ação negada. Usuário comum não pode editar envios.");
        }
	}
	
	public void removerEnvio(Usuario usuario) {
        if (usuario.getTipoUsuario() == TipoUsuario.ADMINISTRADOR) {
            System.out.println("Envio removido por ADMIN.");
        } else {
            System.out.println("Ação negada. Usuário comum não pode remover envios.");
        }
	}
	
	public List<Documento> visualizarDocumentosEnviados(Usuario usuarioLogado){
		System.out.println("Listando documentos para o CPF: " + usuarioLogado.getCpf());
		List<Documento> listaDocumentos = new ArrayList<>();
        listaDocumentos.add(new Documento(1L, "DocComum1.pdf", "/caminho/1", LocalDate.now(), usuarioLogado, TipoDocumento.comprovanteRenda));
        listaDocumentos.add(new Documento(2L, "DocComum2.pdf", "/caminho/2", LocalDate.now(), usuarioLogado, TipoDocumento.despesaMedica));
		return listaDocumentos;
	}
	
	
}

