package id.co.mii.clientapp.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {

  @RequestMapping("/error")
  public String handleError(HttpServletRequest request) {
    Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

    if (status != null) {
      Integer statusCode = Integer.valueOf(status.toString());
      // if (statusCode == HttpStatus.UNAUTHORIZED.value()) {
      //   return "error/page_401";
      // } else 
      if (statusCode == HttpStatus.FORBIDDEN.value()) {
        return "error/page_403";
      } else if (statusCode == HttpStatus.NOT_FOUND.value()) {
        return "error/page_404";
      } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
        return "error/page_500";
      }
    }
    System.out.println(status);
    return "error";
  }

}