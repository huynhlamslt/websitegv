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

import springboot.DAO.HopDongThueDAO;
import springboot.Model.HopDongThue;

@RestController
@RequestMapping("/gvnhanh")
public class HopDonhThueController {
    
    @Autowired
    HopDongThueDAO hopDongThueDAO;

    //Lưu hợp đồng thuê
    @PostMapping("/hdthue")
    public HopDongThue createHDThue(@Validated @RequestBody HopDongThue hdthue){
        return hopDongThueDAO.save(hdthue);
    }

    //Lấy ds hợp đồng thuê
    @GetMapping("/hdthue")
    public List<HopDongThue> getAllHDthue(){
        return hopDongThueDAO.findAll();
    }

    //Lấy hợp đồng thuê qua id
    @GetMapping("/hdthue/{id}")
    public ResponseEntity<HopDongThue> getHDThueById(@PathVariable(value="id") Integer idhdthue){
        HopDongThue hopDongThue = hopDongThueDAO.findOne(idhdthue);

        if(hopDongThue == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(hopDongThue);
    }

    //Cập nhật hợp đồng thuê
    @PutMapping("/hdthue/{id}")
    public ResponseEntity<HopDongThue> updateHDThueById(@PathVariable(value="id") Integer idhdthue, @Validated @RequestBody HopDongThue hdthueDetail){
        HopDongThue hopDongThue = hopDongThueDAO.findOne(idhdthue);

        if(hopDongThue == null){
            return ResponseEntity.notFound().build();
        }

        hopDongThue.setIdkh(hdthueDetail.getIdkh());
        hopDongThue.setIdnguoigv(hdthueDetail.getIdnguoigv());
        hopDongThue.setIdnv(hdthueDetail.getIdnv());
        hopDongThue.setNgaythue(hdthueDetail.getNgaythue());
        hopDongThue.setTrangthai(hdthueDetail.getTrangthai());

        HopDongThue updateHDThue = hopDongThueDAO.save(hopDongThue);
        return ResponseEntity.ok().body(updateHDThue);
    }

    //Xóa hợp đồng thuê
    @DeleteMapping("/hdthue/{id}")
    public ResponseEntity<HopDongThue> deleteHDThue(@PathVariable(value="id") Integer idhdthue){
        HopDongThue hopDongThue = hopDongThueDAO.findOne(idhdthue);

        if(hopDongThue == null){
            return ResponseEntity.notFound().build();
        }
        hopDongThueDAO.delete(hopDongThue);
        return ResponseEntity.ok().build();
    }
}
