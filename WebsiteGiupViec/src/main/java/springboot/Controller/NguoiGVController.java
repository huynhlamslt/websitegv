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

import springboot.DAO.NguoiGVDAO;
import springboot.Model.NguoiGV;

@RestController
@RequestMapping("/gvnhanh")
public class NguoiGVController {

    @Autowired
    NguoiGVDAO nguoiGVDAO;

    // Lưu người giúp việc
    @PostMapping("/nguoigv")
    public NguoiGV createNguoiGV(@Validated @RequestBody NguoiGV ngv) {
        return nguoiGVDAO.save(ngv);
    }

    // Lấy ds người giúp việc
    @GetMapping("/nguoigv")
    public List<NguoiGV> getAllNguoiGV(){
        return nguoiGVDAO.findAll();
    }

    // Lấy 1 người giúp việc qua Id
    @GetMapping("/nguoigv/{id}")
    public ResponseEntity<NguoiGV> getNguoiGvById(@PathVariable(value="id") Integer idngv){
        NguoiGV nguoiGV = nguoiGVDAO.findOne(idngv);

        if(nguoiGV == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(nguoiGV);
    }

    //Update người giúp việc
    @PutMapping("/nguoigv/{id}")
    public ResponseEntity<NguoiGV> updateNguoiGV(@PathVariable(value="id") Integer idngv, @Validated @RequestBody NguoiGV ngvDetail){
        NguoiGV nguoiGV = nguoiGVDAO.findOne(idngv);

        if(nguoiGV == null){
            return ResponseEntity.notFound().build();
        }

        nguoiGV.setHoten(ngvDetail.getHoten());
        nguoiGV.setNgaysinh(ngvDetail.getNgaysinh());
        nguoiGV.setGioitinh(ngvDetail.getGioitinh());
        nguoiGV.setSdt(ngvDetail.getSdt());
        nguoiGV.setCmnd(ngvDetail.getCmnd());
        nguoiGV.setQuequan(ngvDetail.getQuequan());
        nguoiGV.setHinhanh(ngvDetail.getHinhanh());

        NguoiGV updateNguoiGV = nguoiGVDAO.save(nguoiGV);
        return ResponseEntity.ok().body(updateNguoiGV);
    }

    //Xóa người giúp việc
    @DeleteMapping("/nguoigv/{id}")
    public ResponseEntity<NguoiGV> deleteNguoiGV(@PathVariable(value="id") Integer idngv){
        NguoiGV nguoiGV = nguoiGVDAO.findOne(idngv);

        if(nguoiGV == null){
            return ResponseEntity.notFound().build();
        }

        nguoiGVDAO.delete(nguoiGV);
        return ResponseEntity.ok().build();
    }
}


