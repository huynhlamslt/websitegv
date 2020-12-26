package springboot.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.DAO.NhanVienDAO;
import springboot.Model.NhanVien;

@RestController
@RequestMapping("/gvnhanh")
public class NhanVienController {
	
	@Autowired
	NhanVienDAO nhanVienDAO;
	
	//Save nhan vien
	@PostMapping("/nhanvien")
	public NhanVien createNhanvien(@Validated @RequestBody NhanVien nv) {
		return nhanVienDAO.save(nv);
	}
	
	//Get nhan vien
	@GetMapping("/nhanvien")
	public List<NhanVien> getAllNhanvien(){
		return nhanVienDAO.findAll();
	}
	
	//Get nhan vien by id
	@GetMapping("/nhanvien/{id}")
	public ResponseEntity<NhanVien> getNhanvienId(@PathVariable(value="id") Integer manv){
		NhanVien nVien =  nhanVienDAO.findOne(manv);
		
		if(nVien==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(nVien);
	}

	//Get nhan vien chua co tai khoan
	@GetMapping("/nhanvien/tk")
	public List<NhanVien> getAllNhanvienTk(){
		return nhanVienDAO.findTKNhanVien();
	}

	//Get nhan vien chua co lich hen
	@GetMapping("/nhanvien/{gio}/{ngay}")
	public List<NhanVien> getAllNhanvienLH(@PathVariable(value="gio") String gio, @PathVariable(value="ngay") String ngay){
		return nhanVienDAO.findByTimeNhanVien(gio, ngay);
	}
	
	//Update nhan vien
	@PutMapping("/nhanvien/{id}")
	public ResponseEntity<NhanVien> updateNhanVien(@PathVariable(value="id") Integer manv, @Validated @RequestBody NhanVien nvDetail){
		NhanVien nVien =  nhanVienDAO.findOne(manv);
		
		if(nVien==null) {
			return ResponseEntity.notFound().build();
		}
		
		nVien.setHoten(nvDetail.getHoten());
		nVien.setGioitinh(nvDetail.getGioitinh());
		nVien.setNgaysinh(nvDetail.getNgaysinh());
		nVien.setSdt(nvDetail.getSdt());
		nVien.setCmnd(nvDetail.getCmnd());
		nVien.setLuong(nvDetail.getLuong());
		nVien.setHinhanh(nvDetail.getHinhanh());
		
		NhanVien updatenv = nhanVienDAO.save(nVien);
		return ResponseEntity.ok().body(updatenv);
	}
	
	//Delete nhan vien
	@DeleteMapping("/nhanvien/{id}")
	public ResponseEntity<NhanVien> deleteNhanVien(@PathVariable(value="id") Integer manv){
		NhanVien nVien =  nhanVienDAO.findOne(manv);
		
		if(nVien==null) {
			return ResponseEntity.notFound().build();
		}
		
		nhanVienDAO.delete(nVien);
		return ResponseEntity.ok().build();
	}

	//Get list nhan vien by name
	@GetMapping("/nhanvien/find/{ten}")
	public List<NhanVien> findByName(@PathVariable(value="ten") String ten){
		return nhanVienDAO.findByName(ten);
	}
}

