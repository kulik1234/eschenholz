package pl.eschenholz.api.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import pl.eschenholz.api.enums.ContactFormStatus;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class ContactForm extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Boolean ifEmail;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Boolean ifPhone;

    @NotNull
    private String content;

    private Long customerId;

    private ContactFormStatus status;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY,value = "name")
    private String customerFirstName;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY,value = "surname")
    private String customerLastName;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String customerName;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String customerEmail;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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

    public ContactForm(Long id, String subject, @NotNull String content, ContactFormStatus status, String customerFirstName, String customerLastName,Long customerId) {
        this.id = id;
        this.subject = subject;
        this.content = content;
        this.status = status;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.customerId = customerId;
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
