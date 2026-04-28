@Service
public class LocalFileSystemStorageService implements StorageService {
    private final Path rootLocation = Paths.get("upload-dir");

    @Override
    public String store(MultipartFile file) {
        try {
            if (file.isEmpty()) throw new RuntimeException("Arquivo vazio.");
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.rootLocation.resolve(filename));
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivo", e);
        }
    }
    
    @Override
    public Resource loadAsResource(String filename) {
        // Lógica para carregar o arquivo do disco para o download
        try {
            Path file = rootLocation.resolve(filename);
            return new UrlResource(file.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException("Arquivo não encontrado", e);
        }
    }
}