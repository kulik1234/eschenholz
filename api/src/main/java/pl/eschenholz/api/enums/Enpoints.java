package pl.eschenholz.api.enums;

public interface Enpoints {
    String PHOTO_ENDPOINT = "/api/photo";
    String PHOTO_ENDPOINT_WITH_PATHVARIABLE = "/api/photo/{id}";
    String PHOTO_ENDPOINT_WITH_CATEGORY_AND_PATHVARIABLE = "/api/photo/category/{category}";

    /*
   PHOTO_ENDPOINT("/api/photo"),PHOTO_ENDPOINT_WITH_PATHVARIABLE("/api/photo/{id}"),PHOTO_ENDPOINT_WITH_CATEGORY_AND_PATHVARIABLE("/api/photo/category/{category}");
   Enpoints(String location) {
        this.location = location;
    }
    public String location;

    public String getLocation() {
        return location;
    }*/
}