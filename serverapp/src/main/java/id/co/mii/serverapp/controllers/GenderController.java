package id.co.mii.serverapp.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.serverapp.models.Gender;
import id.co.mii.serverapp.services.GenderService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/gender")
@AllArgsConstructor
public class GenderController {

    private GenderService genderService;

    @GetMapping
    public List<Gender> getAll(){
        return genderService.getAll();
    }

}
