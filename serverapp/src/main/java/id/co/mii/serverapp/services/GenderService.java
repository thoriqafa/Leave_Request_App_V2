package id.co.mii.serverapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import id.co.mii.serverapp.models.Gender;
import id.co.mii.serverapp.repositories.GenderRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GenderService {
    
    private GenderRepository genderRepository;

    public List<Gender> getAll(){
        return genderRepository.findAll();
    }

}
