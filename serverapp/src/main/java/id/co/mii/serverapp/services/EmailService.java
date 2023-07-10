package id.co.mii.serverapp.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.FileUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import id.co.mii.serverapp.models.dto.request.EmailRequest;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailRequest sendHtmlMessage(EmailRequest emailRequest){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());

            String templateContent;
            
            try {
                File file = new File("src/main/resources/templates/EmailTemplates.html");
                templateContent = FileUtils.readFileToString(file, StandardCharsets.UTF_8);
            } catch (IOException e) {
                throw new IllegalStateException("Failed to read template file!");
            }

            templateContent = templateContent.replace("{{NAME}}", emailRequest.getName());
            templateContent = templateContent.replace("{{STATUS}}", emailRequest.getStatus());
            templateContent = templateContent.replace("{{DURATION}}", String.valueOf(emailRequest.getDuration()));

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy 'at' HH:mm:ss");
            LocalDateTime start_date = emailRequest.getStart_date();
            String formattedStartDate = start_date.format(formatter);
            // templateContent = templateContent.replace("{{START_DATE}}", String.valueOf(emailRequest.getStart_date()));
            templateContent = templateContent.replace("{{START_DATE}}", formattedStartDate);

            LocalDateTime end_date = emailRequest.getEnd_date();
            String formattedEndDate = end_date.format(formatter);
            // templateContent = templateContent.replace("{{END_DATE}}", emailRequest.getEnd_date());
            // templateContent = templateContent.replace("{{END_DATE}}", String.valueOf(emailRequest.getEnd_date()));
            templateContent = templateContent.replace("{{END_DATE}}", formattedEndDate);
            
            templateContent = templateContent.replace("{{TYPE}}", emailRequest.getType());
            templateContent = templateContent.replace("{{NOTES}}", emailRequest.getNotes());
            templateContent = templateContent.replace("{{REMARKS}}", emailRequest.getRemaks());

            helper.setText(templateContent, true);

            javaMailSender.send(message);

            System.out.println("Email success to send...");
        } catch (MessagingException e) {
            throw new IllegalStateException("Email failed to send!");
        }
        return emailRequest;
    }
}
