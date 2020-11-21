package springboot.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.Model.KhachHang;
import springboot.Repository.KhachHangRepository;

@Service
public class KhachHangDAO {
    
    @Autowired
    KhachHangRepository khachHangRepository;

    //Save
    public KhachHang save(KhachHang kh){
        return khachHangRepository.save(kh);
    }

    //Get all
    public List<KhachHang> findAll(){
        return khachHangRepository.findAll();
    }

    //Get by Id
    public KhachHang findOne(Integer idkh){
        return khachHangRepository.findById(idkh).orElse(null);
    }

    //Delete 
    public void delete(KhachHang kh){
        khachHangRepository.delete(kh);
    }
}
