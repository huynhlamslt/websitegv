package springboot.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.Model.YeuCau;
import springboot.Repository.YeuCauRepository;

@Service
public class YeuCauDAO {
    
    @Autowired
    YeuCauRepository yeuCauRepository;

    //Save
    public YeuCau save(YeuCau yc){
        return yeuCauRepository.save(yc);
    }

    //Get all
    public List<YeuCau> findAll(){
        return yeuCauRepository.findAll();
    }

    //Get by Id
    public YeuCau findOne(Integer idyc){
        return yeuCauRepository.findById(idyc).orElse(null);
    }

    //Get by Idlichhen
    public YeuCau findByIdlichhen(Integer idlichhen){
        return yeuCauRepository.findYeuCauByLichHen(idlichhen);
    }

    //Delete
    public void delete(YeuCau yc){
        yeuCauRepository.delete(yc);
    }
}
