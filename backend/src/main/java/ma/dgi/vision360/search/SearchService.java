package ma.dgi.vision360.search;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import ma.dgi.vision360.search.dto.SearchItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    private final ElasticsearchClient es;

    // ✅ configurable index name (fallback to taxpayer_search)
    @Value("${es.taxpayer.index:taxpayer_search}")
    private String indexName;

    public SearchService(ElasticsearchClient es) {
        this.es = es;
    }

    public List<SearchItem> search(String q, String ville, String secteur, int size) throws IOException {
        final int pageSize = (size <= 0 || size > 100) ? 30 : size;

        // text search across common fields (include both camelCase & snake_case, just in case)
        final Query text = (q == null || q.isBlank())
                ? Query.of(qb -> qb.matchAll(m -> m))
                : Query.of(qb -> qb.simpleQueryString(s -> s
                .query(q)
                .fields(
                        "nom^3",
                        "adresse",
                        "identifiantFiscal",
                        "identifiant_fiscal",
                        "ice",
                        "cin",
                        "ville",
                        "secteur"
                )
        ));

        final List<Query> filters = new ArrayList<>();
        if (ville != null && !ville.isBlank()) {
            // ✅ term filter against the keyword subfield
            filters.add(Query.of(qv -> qv.term(t -> t.field("ville.keyword").value(ville))));
        }
        if (secteur != null && !secteur.isBlank()) {
            // ✅ term filter against the keyword subfield
            filters.add(Query.of(qs -> qs.term(t -> t.field("secteur.keyword").value(secteur))));
        }

        SearchResponse<SearchItem> res = es.search(s -> s
                        .index(indexName)
                        .size(pageSize)
                        .query(qb -> qb.bool(b -> b.must(text).filter(filters))),
                SearchItem.class);

        return res.hits().hits().stream()
                .map(h -> h.source() != null
                        ? h.source()
                        : new SearchItem(h.id(), null, null, null, null, null, null, null))
                .toList();
    }
}
