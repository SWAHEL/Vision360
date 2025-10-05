package ma.dgi.vision360.watchlist;

import ma.dgi.vision360.watchlist.entity.WatchlistMember;
import ma.dgi.vision360.watchlist.entity.WatchlistMemberId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistMemberRepository
        extends JpaRepository<WatchlistMember, WatchlistMemberId> {}
