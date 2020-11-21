package springboot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import springboot.Model.KhachHang;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer>{
    
}
