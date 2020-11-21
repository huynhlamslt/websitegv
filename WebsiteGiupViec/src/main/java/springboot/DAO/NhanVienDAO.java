package springboot.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.Model.NhanVien;
import springboot.Repository.NhanVienRepository;

@Service
public class NhanVienDAO {
	
	@Autowired
	NhanVienRepository nhanVienRepository;
	
	//Save 
	public NhanVien save(NhanVien nv) {
		return nhanVienRepository.save(nv);
	}
	
	//Search
	public List<NhanVien> findAll(){
		return nhanVienRepository.findAll();
	}
	
	//Get MaNV
	public NhanVien findOne(Integer manv) {
		return nhanVienRepository.findById(manv).orElse(null);
	}
	
	//Delete
	public void delete(NhanVien nv) {
		nhanVienRepository.delete(nv);
	}
}
