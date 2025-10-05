package ma.dgi.vision360.error;
import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import jakarta.servlet.http.HttpServletRequest;
@ControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> onAny(Exception ex, HttpServletRequest req) {
    ApiError e = new ApiError();
    e.timestamp = java.time.OffsetDateTime.now(); e.status = 500; e.error = "Internal Server Error";
    e.message = ex.getMessage(); e.path = req.getRequestURI();
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
  }
}
