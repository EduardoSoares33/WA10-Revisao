import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("WA10 - API de Gestão Contábil")
                        .version("1.0.0")
                        .description("Documentação das rotas de back-end para o sistema WA10 Serviços Contábeis."));
    }
}