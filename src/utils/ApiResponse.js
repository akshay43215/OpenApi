
export class ApiResponse {
  constructor(statusCode, data = null, message = "Success") {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  /* ---------- SUCCESS RESPONSES ---------- */

  static ok(data = null, message = "OK") {
    return new ApiResponse(200, data, message);
  }

  static created(data = null, message = "Resource created") {
    return new ApiResponse(201, data, message);
  }

  static accepted(data = null, message = "Request accepted") {
    return new ApiResponse(202, data, message);
  }

  static noContent(message = "No content") {
    return new ApiResponse(204, null, message);
  }

  /* ---------- ERROR-LIKE RESPONSES (optional use) ---------- */

  static badRequest(message = "Bad request", errors = null) {
    return {
      success: false,
      statusCode: 400,
      message,
      errors,
    };
  }

  static notFound(message = "Resource not found") {
    return {
      success: false,
      statusCode: 404,
      message,
    };
  }

  static internal(message = "Internal server error") {
    return {
      success: false,
      statusCode: 500,
      message,
    };
  }
}
