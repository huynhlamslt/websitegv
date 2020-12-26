package springboot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import springboot.Model.HopDongThue;

public interface HopDongThueRepository extends JpaRepository<HopDongThue, Integer>{
    @Query(value="SELECT COUNT(ngaythue) AS solandat FROM hopdongthuedv WHERE ngaythue=:ngaythue GROUP BY ngaythue", nativeQuery = true)
    int countLuotDV(@Param("ngaythue") String ngaythue);

    @Query(value="SELECT count(idhdthue) AS soluong FROM hopdongthuedv", nativeQuery = true)
    int countTongLuotDV();
}
