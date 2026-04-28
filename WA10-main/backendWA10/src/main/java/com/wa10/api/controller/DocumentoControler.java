package br.com.ifb.wa10.controller; // Ajuste para pacote real

import br.com.ifb.wa10.model.Documento;
import br.com.ifb.wa10.model.Usuario;
import br.com.ifb.wa10.service.DocumentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/documentos")
@Tag(name = "Documentos", description = "Gestão de arquivos para o portal WA10")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService;

    @Operation(
        summary = "Realiza o upload de um documento",
        description = "Recebe um arquivo (PDF/XML), valida o tipo, gera um hash de integridade e salva no servidor.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Upload realizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Arquivo inválido ou tipo não permitido"),
            @ApiResponse(responseCode = "500", description = "Erro interno ao processar o arquivo")
        }
    )
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Documento> upload(
            @Parameter(description = "O arquivo PDF ou XML a ser enviado") 
            @RequestParam("file") MultipartFile file,
            
            @Parameter(description = "ID do usuário proprietário do documento")
            @RequestParam("usuarioId") Long usuarioId) {
        
        // Em um cenário real, você buscaria o objeto Usuario pelo ID no banco
        Usuario usuarioFake = new Usuario(); 
        usuarioFake.setId(usuarioId);

        Documento novoDoc = documentoService.upload(file, usuarioFake);
        return ResponseEntity.ok(novoDoc);
    }

    @Operation(
        summary = "Download de documento via UUID",
        description = "Recupera o arquivo físico do servidor utilizando o identificador único (UUID) gerado no upload.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Arquivo localizado e pronto para download"),
            @ApiResponse(responseCode = "404", description = "Documento não encontrado para o UUID fornecido")
        }
    )
    @GetMapping("/download/{uuid}")
    public ResponseEntity<Resource> download(
            @Parameter(description = "UUID público do documento")
            @PathVariable String uuid) {
        
        Documento doc = documentoService.buscarPorUuid(uuid);
        Resource arquivo = documentoService.carregarArquivo(doc.getPathArmazenamento());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(doc.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getNomeOriginal() + "\"")
                .body(arquivo);
    }
}