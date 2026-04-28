public interface StorageService {
    String store(MultipartFile file); // Retorna o caminho ou identificador
    Resource loadAsResource(String filename);
}