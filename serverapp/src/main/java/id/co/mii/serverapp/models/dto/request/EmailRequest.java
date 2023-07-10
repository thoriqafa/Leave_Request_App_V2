package id.co.mii.serverapp.models.dto.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequest {

    private String to;
    private String subject;
    private String name;
    private String status;
    // private String duration;
    private Integer duration;
    // private String start_date;
    private LocalDateTime start_date;
    // private String end_date;
    private LocalDateTime end_date;
    private String type;
    private String notes;
    private String remaks;
}
