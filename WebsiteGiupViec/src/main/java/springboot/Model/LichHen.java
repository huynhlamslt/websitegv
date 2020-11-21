package springboot.Model;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "lichhen")
@EntityListeners(AuditingEntityListener.class)
public class LichHen {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idlichhen;
    private int idnv;
    private int idkh;
    private Date ngay;
    private Time gio;
    private String diachi;

    public LichHen(){

    }

    public LichHen(int idlichhen, int idnv, int idkh, Date ngay, Time gio, String diachi) {
        this.idlichhen = idlichhen;
        this.idnv = idnv;
        this.idkh = idkh;
        this.ngay = ngay;
        this.gio = gio;
        this.diachi = diachi;
    }

    public int getIdlichhen() {
        return idlichhen;
    }

    public void setIdlichhen(int idlichhen) {
        this.idlichhen = idlichhen;
    }

    public int getIdnv() {
        return idnv;
    }

    public void setIdnv(int idnv) {
        this.idnv = idnv;
    }

    public int getIdkh() {
        return idkh;
    }

    public void setIdkh(int idkh) {
        this.idkh = idkh;
    }

    public Date getNgay() {
        return ngay;
    }

    public void setNgay(Date ngay) {
        this.ngay = ngay;
    }

    public Time getGio() {
        return gio;
    }

    public void setGio(Time gio) {
        this.gio = gio;
    }

    public String getDiachi() {
        return diachi;
    }

    public void setDiachi(String diachi) {
        this.diachi = diachi;
    }
}
