package pl.eschenholz.api.entity;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.apache.logging.log4j.util.PropertySource;
import pl.eschenholz.api.enums.PhotoCategory;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.ChronoLocalDateTime;
import java.util.Comparator;
import java.util.Date;
import java.util.Objects;

@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameOrTitle;

    private String path;

    private String description;

    private String author;

    private PhotoCategory category;

    private LocalDateTime date;

    public Photo() {
    }

    public Photo(Long id, String nameOrTitle,String path, String description, String author, PhotoCategory category, LocalDateTime date) {

        this.id = id;
        this.nameOrTitle = nameOrTitle;
        this.path = path;
        this.description = description;
        this.author = author;
        this.category = category;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public PhotoCategory getCategory() {
        return category;
    }

    public void setCategory(PhotoCategory category) {
        this.category = category;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getNameOrTitle() {
        return nameOrTitle;
    }

    public void setNameOrTitle(String nameOrTitle) {
        this.nameOrTitle = nameOrTitle;
    }

    @Override
    public String toString() {
        return "Photo{" +
                "id=" + id +
                ", nameOrTitle='" + nameOrTitle + '\'' +
                ", path='" + path + '\'' +
                ", description='" + description + '\'' +
                ", author='" + author + '\'' +
                ", category=" + category +
                ", date=" + date +
                '}';
    }


}


