package springboot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import springboot.Model.NhanVien;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer>{
	
//	@Query(value ="SELECT * FROM nhanvien WHERE manv=:manv", nativeQuery = true)
//	NhanVien findId(@Param("manv") int manv);
}
