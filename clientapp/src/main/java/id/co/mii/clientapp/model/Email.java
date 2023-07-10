package id.co.mii.clientapp.model;

import lombok.Data;

@Data
public class Email {
    
    private String to;
    private String subject;
    private String text;

}
