package backendWA10;

import java.io.File;
import java.util.List;

public class MainWA {

    public static void main(String[] args) {
        System.out.println("--- Iniciando Aplicação de Teste ---");

        Service service = new Service();
        
        //Criação de 2 Usuários (Admin e Comum) usando o Service ---
        
        //O Main agora apenas informa os dados puros para o Service gerenciar
        service.criarEArmazenarUsuario("111", "senhaAdmin123", TipoUsuario.ADMINISTRADOR);
        service.criarEArmazenarUsuario("222", "senhaComum456", TipoUsuario.COMUM);
        
        System.out.println("\n--- Usuários criados e armazenados no 'Service' ---");

        //Testes de Acesso (1 erro e 1 acerto para cada)
        System.out.println("\n*** Testes de Login ***");
        
        //O Service retorna o objeto Usuario se o login for válido
        Usuario userAdminLogado = service.realizarLogin("111", "senhaAdmin123");
        System.out.println("Login Admin Correto: " + (userAdminLogado != null ? "SUCESSO" : "FALHA"));

        Usuario userAdminErro = service.realizarLogin("111", "senhaErrada");
        System.out.println("Login Admin Incorreto: " + (userAdminErro != null ? "SUCESSO" : "FALHA"));

        Usuario userComumLogado = service.realizarLogin("222", "senhaComum456");
        System.out.println("Login Comum Correto: " + (userComumLogado != null ? "SUCESSO" : "FALHA"));

        Usuario userComumErro = service.realizarLogin("222", "senhaErrada");
        System.out.println("Login Comum Incorreto: " + (userComumErro != null ? "SUCESSO" : "FALHA"));


        //Fluxo de Documentos
        System.out.println("\n*** Fluxo do Usuário Comum (" + userComumLogado.getTipoUsuario() + ") ***");
        if (userComumLogado != null) {
            service.enviarDocumento(); 
            List<Documento> docsComuns = service.visualizarDocumentosEnviados(userComumLogado);
            System.out.println("Comum visualizou " + docsComuns.size() + " documentos.");
            File documentoBaixado = service.baixarDocumento();
            System.out.println("Arquivo baixado para o caminho: " + documentoBaixado.getAbsolutePath());
            System.out.println("Primeiro documento do comum: " + docsComuns.get(0).getNomeArquivo() + 
                               " | Tipo: " + docsComuns.get(0).getTipoDocumento());
        }

        System.out.println("\n*** Fluxo do Usuário Admin (" + userAdminLogado.getTipoUsuario() + ") ***");
        if (userAdminLogado != null) {
            service.editarEnvio(userAdminLogado); 
            service.removerEnvio(userAdminLogado);
            List<Documento> docsAdmin = service.visualizarDocumentosEnviados(userAdminLogado);
            if (!docsAdmin.isEmpty()) {
                docsAdmin.get(0).setNomeArquivo("EDITADO_PELO_ADMIN.pdf");
                System.out.println("Admin editou nome do doc para: " + docsAdmin.get(0).getNomeArquivo());
            }
        }
        
        System.out.println("\n--- Fim da Demonstração ---");
    }
}
