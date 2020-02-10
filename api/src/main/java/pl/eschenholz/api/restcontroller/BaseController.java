package pl.eschenholz.api.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.eschenholz.api.entity.Base;
import pl.eschenholz.api.interfaces.Endpoint;
import pl.eschenholz.api.service.MainService;


import java.util.Optional;

public class BaseController<T extends Base,R extends MainService,S extends Endpoint> {

    @Autowired
    private R service;

        @GetMapping("/${api.endpoint}")
        public Iterable<T> getAll(
                @RequestParam(defaultValue = "1") Integer pageNo,
                @RequestParam(defaultValue = "10") Integer pageSize,
                @RequestParam(defaultValue = "id") String sortBy,
                @RequestParam(defaultValue = "false") Boolean onlySort,
                @RequestParam(defaultValue = "false") Boolean getAll,
                @RequestParam(defaultValue = "false") Boolean reverseSorting
        ) {
            if(onlySort){
                return service.findAll(sortBy,reverseSorting);
            }
            else if(getAll)
            {
                return service.findAll();
            }
            else
            {
                return service.findAll(pageNo,pageSize,sortBy,reverseSorting);
            }
        }


        @GetMapping("/"+S.ENDPOINT_NAME +"/{id}")
        public Optional<T> getById(@PathVariable("id") Long id){
            return service.findById(id);
        }

        @PutMapping("/"+S.ENDPOINT_NAME)
        public T insert(@RequestBody T p){
            return (T) service.save(p);
        }

        @PostMapping("/"+S.ENDPOINT_NAME)
        public T update(@RequestBody T p){
            return (T) service.findById(p.getId()).orElse(service.save(p));
        }

        @DeleteMapping("/"+S.ENDPOINT_NAME)
        public void remove(@RequestBody T p){
            service.delete(p);
        }


}
