package springboot.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.DAO.TaiKhoanDAO;
import springboot.Model.TaiKhoan;

@RestController
@RequestMapping("/gvnhanh")
public class TaiKhoanController {
    
    @Autowired
    TaiKhoanDAO taiKhoanDAO;

    //Lưu tài khoản
    @PostMapping("/taikhoan")
    public TaiKhoan createTaiKhoan(@Validated @RequestBody TaiKhoan tk){
        return taiKhoanDAO.save(tk);
    }

    //Lấy ds tài khoản
    @GetMapping("/takhoan")
    public List<TaiKhoan> getAllTaiKhoan(){
        return taiKhoanDAO.findAll();
    }

    //Lấy tài khoản qua Id
    @GetMapping("/taikhoan/{id}")
    public ResponseEntity<TaiKhoan> getTaiKhoanById(@PathVariable(value = "id") Integer idtk){
        TaiKhoan taiKhoan = taiKhoanDAO.findOne(idtk);

        if(taiKhoan == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(taiKhoan);
    }

    //Cập nhật tài khoản
    @PutMapping("/taikhoan/{id}")
    public ResponseEntity<TaiKhoan> updateTaiKhoan(@PathVariable(value = "id") Integer idtk, @Validated @RequestBody TaiKhoan tkDetail){
        TaiKhoan taiKhoan = taiKhoanDAO.findOne(idtk);

        if(taiKhoan == null){
            return ResponseEntity.notFound().build();
        }

        taiKhoan.setSdt(tkDetail.getSdt());
        taiKhoan.setPass(tkDetail.getPass());
        taiKhoan.setIdnv(tkDetail.getIdnv());
        taiKhoan.setQuyen(tkDetail.getQuyen());
        taiKhoan.setTrangthai(tkDetail.getTrangthai());

        TaiKhoan updateTaiKhoan = taiKhoanDAO.save(taiKhoan);
        return ResponseEntity.ok().body(updateTaiKhoan);
    }

    //Xóa tài khoản
    public ResponseEntity<TaiKhoan> deleteTaiKhoan(@PathVariable(value = "id") Integer idtk){
        TaiKhoan taiKhoan = taiKhoanDAO.findOne(idtk);

        if(taiKhoan == null){
            return ResponseEntity.notFound().build();
        }

        taiKhoanDAO.delete(taiKhoan);
        return ResponseEntity.ok().build();
    }
}
