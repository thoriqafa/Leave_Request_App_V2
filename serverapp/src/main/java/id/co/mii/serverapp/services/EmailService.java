package id.co.mii.serverapp.services;

import javax.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import id.co.mii.serverapp.models.dto.request.EmailRequest;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailRequest sendSimpleMessage(EmailRequest emailRequest){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(emailRequest.getTo());
        message.setSubject(emailRequest.getSubject());
        message.setText(emailRequest.getText());

        javaMailSender.send(message);
        return emailRequest;
    }

    public EmailRequest sendMessageWithAttachment(EmailRequest emailRequest){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());
            helper.setText(emailRequest.getText());

            javaMailSender.send(message);

            System.out.println("\nEmail success to send!!!\n");

        } catch (Exception e) {
            throw new IllegalStateException("Email failed to send!!!");
        }
        return emailRequest;
    }
}
