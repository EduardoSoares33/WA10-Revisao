package backendWA10;

public class Usuario {
	
	private String cpf;
	private String senhaHash;
	private TipoUsuario tipoUsuario;
	
	public Usuario(String cpf, String senhaHash, TipoUsuario tipoUsuario) {
		this.cpf = cpf;
		this.senhaHash = senhaHash;
		this.tipoUsuario = tipoUsuario;
	}
	
	public String getCpf() {
		return cpf;
	}
	
	public TipoUsuario getTipoUsuario(){
		return tipoUsuario;
	}

	public String getSenhaHash() {
		return senhaHash;
	}	
	
}
