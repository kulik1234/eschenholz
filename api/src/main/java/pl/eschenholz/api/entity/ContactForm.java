package pl.eschenholz.api.entity;

import pl.eschenholz.api.enums.ContactFormStatus;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class ContactForm extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private Boolean ifEmail;

    private Boolean ifPhone;

    @NotNull
    private String content;

    private Long customerId;

    private ContactFormStatus status;

    @Transient
    private String customerName;

    @Transient
    private String customerEmail;

    @Transient
    private String customerPhone;


    public ContactForm() {
    }

    public ContactForm(Long id, String subject, Boolean ifEmail, Boolean ifPhone, @NotNull String content, Long customerId, ContactFormStatus status, String customerName, String customerEmail, String customerPhone) {
        this.id = id;
        this.subject = subject;
        this.ifEmail = ifEmail;
        this.ifPhone = ifPhone;
        this.content = content;
        this.customerId = customerId;
        this.status = status;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
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

    public void setCustomerId(Long customer) {
        this.customerId = customer;
    }

    public ContactFormStatus getStatus() {
        return status;
    }

    public void setStatus(ContactFormStatus status) {
        this.status = status;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
}
