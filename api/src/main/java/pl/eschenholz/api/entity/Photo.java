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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String path;

    private String description;

    private String author;

    private PhotoCategory category;

    private LocalDateTime date;

    public Photo() {
    }

    public Photo(Long id, String path, String description, String author, PhotoCategory category,LocalDateTime date) {

        this.id = id;
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



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Photo photo = (Photo) o;
        return Objects.equals(id, photo.id) &&
                Objects.equals(path, photo.path) &&
                Objects.equals(description, photo.description) &&
                Objects.equals(author, photo.author) &&
                category == photo.category &&
                Objects.equals(date, photo.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, path, description, author, category, date);
    }
}
