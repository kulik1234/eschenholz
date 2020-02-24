package pl.eschenholz.api.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import pl.eschenholz.api.ApiApplication;

@ConfigurationProperties("storage")
public class StorageProperties {

    /**
     * Folder location for storing files
     */
    private String location = ApiApplication.class.getProtectionDomain().getCodeSource().getLocation().getPath().toString().split("[A-Z]{1}:").length>1?ApiApplication.class.getProtectionDomain().getCodeSource().getLocation().getPath().toString().split("[A-Z]{1}:")[1]+"../../../public/uploaded":ApiApplication.class.getProtectionDomain().getCodeSource().getLocation().getPath().toString().split("[A-Z]{1}:")[0]+"../../../public/uploaded";

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
