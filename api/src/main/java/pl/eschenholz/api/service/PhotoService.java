package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.repository.PhotoRepo;

@Service
public class PhotoService extends MainService<Photo, PhotoRepo> {

   @Autowired
    private PhotoRepo repo;
}
