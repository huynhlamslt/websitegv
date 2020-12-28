package springboot.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import springboot.Model.HopDongThue;

public interface HopDongThueRepository extends JpaRepository<HopDongThue, Integer>{
    @Query(value="SELECT COUNT(ngaythue) AS solandat FROM hopdongthuedv WHERE ngaythue=:ngaythue GROUP BY ngaythue", nativeQuery = true)
    int countLuotDV(@Param("ngaythue") String ngaythue);

    @Query(value="SELECT count(idhdthue) AS soluong FROM hopdongthuedv", nativeQuery = true)
    int countTongLuotDV();

    @Query(value = "SELECT * FROM hopdongthuedv, yeucau, nguoigiupviec\r\n" 
    +"WHERE hopdongthuedv.idkh = yeucau.idyc AND hopdongthuedv.idnguoigv = nguoigiupviec.idnguoigv\r\n"
    +"AND (yeucau.hoten LIKE %:ten% OR nguoigiupviec.hoten LIKE %:ten%)", nativeQuery = true)
    List<HopDongThue> findByName(@Param("ten") String ten);
}
