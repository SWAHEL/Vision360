package ma.dgi.vision360.timeline;

import ma.dgi.vision360.timeline.entity.TimelineEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TimelineEventRepository extends JpaRepository<TimelineEvent, UUID> {

    Page<TimelineEvent> findByTaxpayerIdOrderByOccurredAtDesc(UUID taxpayerId, Pageable pageable);

    long countByTaxpayerId(UUID taxpayerId);
}
