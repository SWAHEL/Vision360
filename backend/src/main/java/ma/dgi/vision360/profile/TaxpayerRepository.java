package ma.dgi.vision360.profile;

import ma.dgi.vision360.profile.entity.Taxpayer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaxpayerRepository extends JpaRepository<Taxpayer, UUID> {}
