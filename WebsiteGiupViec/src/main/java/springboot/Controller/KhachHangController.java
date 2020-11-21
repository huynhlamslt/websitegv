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

import springboot.DAO.KhachHangDAO;
import springboot.Model.KhachHang;

@RestController
@RequestMapping("/gvnhanh")
public class KhachHangController {
    
    @Autowired
    KhachHangDAO khachHangDAO;

    //Lưu khách hàng
    @PostMapping("/khachhang")
    public KhachHang createKhachHang(@Validated @RequestBody KhachHang kh){
        return khachHangDAO.save(kh);
    }

    //Lấy ds khách hàng
    @GetMapping("/khachhang")
    public List<KhachHang> getAllKhachHang(){
        return khachHangDAO.findAll();
    }

    //Lấy 1 khách hàng
    @GetMapping("/khachhang/{id}")
    public ResponseEntity<KhachHang> getKhachHangById(@PathVariable(value = "id") Integer idkh){
        KhachHang khachHang = khachHangDAO.findOne(idkh);

        if(khachHang==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(khachHang);
    }

    //Update khách hàng
    @PutMapping("/khachhang/{id}")
    public ResponseEntity<KhachHang> updateKhachHang(@PathVariable(value = "id") Integer idkh, @Validated @RequestBody KhachHang khDetail){
        KhachHang khachHang = khachHangDAO.findOne(idkh);

        if(khachHang==null){
            return ResponseEntity.notFound().build();
        }

        khachHang.setHoten(khDetail.getHoten());
        khachHang.setSdt(khDetail.getSdt());
        khachHang.setEmail(khDetail.getEmail());
        khachHang.setDiachi(khDetail.getDiachi());

        KhachHang updateKhachhang = khachHangDAO.save(khachHang);
        return ResponseEntity.ok().body(updateKhachhang);
    }

    //Xóa khách hàng
    @DeleteMapping("/khachang/{id}")
    public ResponseEntity<KhachHang> deleteKhachHang(@PathVariable(value = "id") Integer idkh){
        KhachHang khachHang = khachHangDAO.findOne(idkh);

        if(khachHang==null){
            return ResponseEntity.notFound().build();
        }

        khachHangDAO.delete(khachHang);
        return ResponseEntity.ok().build();
    }
}