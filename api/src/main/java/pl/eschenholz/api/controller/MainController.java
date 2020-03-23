package pl.eschenholz.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @RequestMapping({"/","/contact","/offert"})
    public String testJpa(){
        return "index";
    }
    @RequestMapping("/dupa-zbita")
    public String abc(Model model){
        model.addAttribute("a","to jest dupa zbita");
        return "dupa";
    }

}
