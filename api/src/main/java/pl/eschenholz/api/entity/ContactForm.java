package pl.eschenholz.api.entity;

import pl.eschenholz.api.enums.ContactFormStatus;

import javax.persistence.*;

@Entity
public class ContactForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private Boolean ifEmail;

    private Boolean ifPhone;

    private String content;

    private Long customerId;

    private ContactFormStatus status;


    public ContactForm() {
    }

    public ContactForm(Long id, String subject, Boolean ifEmail, Boolean ifPhone, String content, Long customerId,ContactFormStatus status) {
        this.id = id;
        this.subject = subject;
        this.ifEmail = ifEmail;
        this.ifPhone = ifPhone;
        this.content = content;
        this.customerId = customerId;
        this.status = status;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Boolean getIfEmail() {
        return ifEmail;
    }

    public void setIfEmail(Boolean ifEmail) {
        this.ifEmail = ifEmail;
    }

    public Boolean getIfPhone() {
        return ifPhone;
    }

    public void setIfPhone(Boolean ifPhone) {
        this.ifPhone = ifPhone;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public ContactFormStatus getStatus() {
        return status;
    }

    public void setStatus(ContactFormStatus status) {
        this.status = status;
    }
}
