@Entity
public class Documento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID interno para o banco

    @Column(unique = true, nullable = false)
    private String uuid = UUID.randomUUID().toString(); // ID público para URLs

    private String nomeOriginal;
    private String pathArmazenamento;
    private String contentType;
    private String checksum; // Hash SHA-256 do arquivo

    @ManyToOne
    private Usuario proprietario;
    
}
	
	public Documento(Long id, String nomeArquivo, String caminhoArquivo, LocalDate dataEnvio, Usuario proprietario, TipoDocumento tipoDocumento) {
		super(id);
		this.nomeArquivo = nomeArquivo;
		this.caminhoArquivo = caminhoArquivo;
		this.proprietario = proprietario;
		this.tipoDocumento = tipoDocumento;
	}

	public String getNomeArquivo() {
		return nomeArquivo;
	}

	public void setNomeArquivo(String nomeArquivo) {
		this.nomeArquivo = nomeArquivo;
	}

	public String getCaminhoArquivo() {
		return caminhoArquivo;
	}

	public void setCaminhoArquivo(String caminhoArquivo) {
		this.caminhoArquivo = caminhoArquivo;
	}

	public void setDataEnvio(LocalDate dataEnvio) {
	}

	public Usuario getProprietario() {
		return proprietario;
	}

	public void setProprietario(Usuario proprietario) {
		this.proprietario = proprietario;
	}

	public TipoDocumento getTipoDocumento() {
		return tipoDocumento;
	}

	public void setTipoDocumento(TipoDocumento tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}



