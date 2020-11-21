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
@Table(name = "hopdongthuedv")
@EntityListeners(AuditingEntityListener.class)
public class HopDongThue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idhdthue;
    private int idkh;
    private int idnguoigv;
    private int idnv;
    private Date ngaythue;
    private String trangthai;

    public HopDongThue(){

    }

    public HopDongThue(int idhdthue, int idkh, int idnguoigv, int idnv, Date ngaythue, String trangthai) {
        this.idhdthue = idhdthue;
        this.idkh = idkh;
        this.idnguoigv = idnguoigv;
        this.idnv = idnv;
        this.ngaythue = ngaythue;
        this.trangthai = trangthai;
    }

    public int getIdhdthue() {
        return idhdthue;
    }

    public void setIdhdthue(int idhdthue) {
        this.idhdthue = idhdthue;
    }

    public int getIdkh() {
        return idkh;
    }

    public void setIdkh(int idkh) {
        this.idkh = idkh;
    }

    public int getIdnguoigv() {
        return idnguoigv;
    }

    public void setIdnguoigv(int idnguoigv) {
        this.idnguoigv = idnguoigv;
    }

    public int getIdnv() {
        return idnv;
    }

    public void setIdnv(int idnv) {
        this.idnv = idnv;
    }

    public Date getNgaythue() {
        return ngaythue;
    }

    public void setNgaythue(Date ngaythue) {
        this.ngaythue = ngaythue;
    }

    public String getTrangthai() {
        return trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }
 
}
