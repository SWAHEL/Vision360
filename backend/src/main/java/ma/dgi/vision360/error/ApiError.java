package ma.dgi.vision360.error;
import java.time.OffsetDateTime;
public class ApiError {
  public OffsetDateTime timestamp; public int status; public String error; public String message; public String path;
}
