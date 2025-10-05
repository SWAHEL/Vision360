package ma.dgi.vision360.security;
import jakarta.servlet.*;
import java.io.IOException;
public class JwtAuthFilter implements Filter {
  @Override public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException { chain.doFilter(req,res); }
}
