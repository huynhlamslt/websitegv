package springboot.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.Model.HopDongThue;
import springboot.Repository.HopDongThueRepository;

@Service
public class HopDongThueDAO {

    @Autowired
    HopDongThueRepository hopDongThueRepository;

    //Save
    public HopDongThue save(HopDongThue hdthue){
        return hopDongThueRepository.save(hdthue);
    }

    //Get all
    public List<HopDongThue> findAll(){
        return hopDongThueRepository.findAll();
    }

    //Get by Id
    public HopDongThue findOne(Integer idhdthue){
        return hopDongThueRepository.findById(idhdthue).orElse(null);
    }

    //Delete
    public void delete(HopDongThue hdthue){
        hopDongThueRepository.delete(hdthue);
    }
}