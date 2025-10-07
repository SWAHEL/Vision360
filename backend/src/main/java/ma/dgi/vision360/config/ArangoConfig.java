package ma.dgi.vision360.config;

import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ArangoConfig {

    @Value("${arangodb.host:localhost}")   private String host;
    @Value("${arangodb.port:8529}")        private int port;
    @Value("${arangodb.user:root}")        private String user;
    @Value("${arangodb.password:arangopass123!}") private String password;
    @Value("${arangodb.database:vision360}")       private String database;

    @Bean
    public ArangoDB arangoDB() {
        return new ArangoDB.Builder()
                .host(host, port)
                .user(user)
                .password(password)
                .build();
    }

    @Bean
    public ArangoDatabase arangoDatabase(ArangoDB adb) {
        return adb.db(database);
    }
}
