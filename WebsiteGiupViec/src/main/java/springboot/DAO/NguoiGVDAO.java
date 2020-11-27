package springboot.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.Model.NguoiGV;
import springboot.Repository.NguoiGVRepository;

@Service
public class NguoiGVDAO {
    
    @Autowired
    NguoiGVRepository nguoiGVRepository;

    //Save
    public NguoiGV save(NguoiGV ngv){
        return nguoiGVRepository.save(ngv);
    }

    //Get all
    public List<NguoiGV> findAll(){
        return nguoiGVRepository.findAll();
    }

    //Get all true
    public List<NguoiGV> findAlltrue(){
        return nguoiGVRepository.findAlltrue();
    }

    //Get all tuyen dung
    public List<NguoiGV> findAlltuyendung(){
        return nguoiGVRepository.findAlltuyendung();
    }

    //Get by Id
    public NguoiGV findOne(Integer idngv){
        return nguoiGVRepository.findById(idngv).orElse(null);
    }

    //Delete 
    public void delete(NguoiGV ngv){
        nguoiGVRepository.delete(ngv);
    }

    //Delete by Id
    public void deleteNguoigv(Integer idngv){
        nguoiGVRepository.deleteNguoigv(idngv);
    }
}
