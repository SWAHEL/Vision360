package ma.dgi.vision360.search;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.Header;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
public class EsClientConfig {

    @Bean
    public ElasticsearchClient esClient(
            @Value("${elasticsearch.url}") String url,
            @Value("${elasticsearch.username}") String user,
            @Value("${elasticsearch.password}") String pass) {

        String basic = Base64.getEncoder()
                .encodeToString((user + ":" + pass).getBytes(StandardCharsets.UTF_8));

        Header[] headers = new Header[] { new BasicHeader("Authorization", "Basic " + basic) };

        RestClient rest = RestClient.builder(org.apache.http.HttpHost.create(url))
                .setDefaultHeaders(headers)
                .build();

        ElasticsearchTransport transport = new RestClientTransport(rest, new JacksonJsonpMapper());
        return new ElasticsearchClient(transport);
    }
}
