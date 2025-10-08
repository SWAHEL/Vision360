package ma.dgi.vision360.profile;

import ma.dgi.vision360.profile.entity.Taxpayer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TaxpayerRepository extends JpaRepository<Taxpayer, java.util.UUID> {

    @Query("""
        select t from Taxpayer t
        where lower(t.identifiant_fiscal) like lower(concat('%', :q, '%'))
           or lower(t.nom)                like lower(concat('%', :q, '%'))
           or lower(t.ice)                like lower(concat('%', :q, '%'))
           or lower(t.cin)                like lower(concat('%', :q, '%'))
        """)
    Page<Taxpayer> search(@Param("q") String q, Pageable pageable);

    @Query("select t from Taxpayer t where t.identifiant_fiscal = :if")
    Optional<Taxpayer> findByIdentifiantFiscal(@Param("if") String identifiantFiscal);
}
