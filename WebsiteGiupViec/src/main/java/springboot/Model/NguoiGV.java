package springboot.Model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name ="nguoigiupviec")
@EntityListeners(AuditingEntityListener.class)
public class NguoiGV {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int idnguoigv;
    private String hoten;
    private String gioitinh;
    private Date ngaysinh;
    private String sdt;
    private String cmnd;
    private String quequan;
    private String hinhanh;

    public NguoiGV(){

    }

    public NguoiGV(int idnguoigv, String hoten, String gioitinh, Date ngaysinh, String sdt, String cmnd, String quequan,
            String hinhanh) {
        this.idnguoigv = idnguoigv;
        this.hoten = hoten;
        this.gioitinh = gioitinh;
        this.ngaysinh = ngaysinh;
        this.sdt = sdt;
        this.cmnd = cmnd;
        this.quequan = quequan;
        this.hinhanh = hinhanh;
    }

    public int getIdnguoigv() {
        return idnguoigv;
    }

    public void setIdnguoigv(int idnguoigv) {
        this.idnguoigv = idnguoigv;
    }

    public String getHoten() {
        return hoten;
    }

    public void setHoten(String hoten) {
        this.hoten = hoten;
    }

    public String getGioitinh() {
        return gioitinh;
    }

    public void setGioitinh(String gioitinh) {
        this.gioitinh = gioitinh;
    }

    public Date getNgaysinh() {
        return ngaysinh;
    }

    public void setNgaysinh(Date ngaysinh) {
        this.ngaysinh = ngaysinh;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getCmnd() {
        return cmnd;
    }

    public void setCmnd(String cmnd) {
        this.cmnd = cmnd;
    }

    public String getQuequan() {
        return quequan;
    }

    public void setQuequan(String quequan) {
        this.quequan = quequan;
    }

    public String getHinhanh() {
        return hinhanh;
    }

    public void setHinhanh(String hinhanh) {
        this.hinhanh = hinhanh;
    }

    
}
