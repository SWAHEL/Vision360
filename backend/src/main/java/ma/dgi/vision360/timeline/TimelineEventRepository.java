package ma.dgi.vision360.timeline;
import ma.dgi.vision360.timeline.entity.TimelineEvent; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface TimelineEventRepository extends JpaRepository<TimelineEvent, UUID> {}
