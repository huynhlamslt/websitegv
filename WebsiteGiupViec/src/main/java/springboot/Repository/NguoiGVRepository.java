package springboot.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import springboot.Model.NguoiGV;

public interface NguoiGVRepository extends JpaRepository<NguoiGV, Integer>{
    @Query(value ="SELECT * FROM nguoigiupviec WHERE nguoigiupviec.del=0 and nguoigiupviec.ungtuyen=0;", nativeQuery = true)
    List<NguoiGV> findAlltrue();

    @Query(value ="SELECT * FROM nguoigiupviec WHERE nguoigiupviec.ungtuyen=1", nativeQuery = true)
    List<NguoiGV> findAlltuyendung();

    @Transactional
    @Modifying
	@Query(value ="UPDATE nguoigiupviec SET del=1 WHERE idnguoigv=:idnguoigv", nativeQuery = true)
	void deleteNguoigv(@Param("idnguoigv") int idnguoigv);
}
