@Service
public class DocumentoService {
    @Autowired private StorageService storageService;
    @Autowired private DocumentoRepository repository;

    public Documento upload(MultipartFile file, Usuario user) {
        // 1. Validar Tipo (Ex: apenas PDF e XML)
        List<String> allowedTypes = Arrays.asList("application/pdf", "text/xml");
        if (!allowedTypes.contains(file.getContentType())) {
            throw new RuntimeException("Tipo de arquivo não permitido.");
        }

        // 2. Gerar Checksum (Integridade)
        String hash = gerarHash(file);

        // 3. Armazenar
        String path = storageService.store(file);

        // 4. Salvar Metadados
        Documento doc = new Documento();
        doc.setNomeOriginal(file.getOriginalFilename());
        doc.setPathArmazenamento(path);
        doc.setContentType(file.getContentType());
        doc.setChecksum(hash);
        doc.setProprietario(user);

        return repository.save(doc);
    }

    private String gerarHash(MultipartFile file) {
        try {
            byte[] hash = MessageDigest.getInstance("SHA-256").digest(file.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) { return null; }
    }
}