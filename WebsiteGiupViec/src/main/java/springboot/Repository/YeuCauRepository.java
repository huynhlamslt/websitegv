package springboot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import springboot.Model.YeuCau;

public interface YeuCauRepository extends JpaRepository<YeuCau, Integer>{
    @Query(value ="SELECT * FROM yeucau WHERE idyc IN (SELECT idkh FROM lichhen WHERE idlichhen=:idlichhen);", nativeQuery = true)
    YeuCau findYeuCauByLichHen(@Param("idlichhen") int idlichhen);
}
