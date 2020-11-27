package springboot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import springboot.Model.LoaiDichVu;

public interface LoaiDichVuRepository extends JpaRepository<LoaiDichVu,Integer>{
    @Query(value ="select * from loaidv where idloaidv in (select idloaidv from bangphidv where bangphidv.iddv=:iddv);", nativeQuery = true)
	LoaiDichVu findByIdDv(@Param("iddv") int iddv);
}
