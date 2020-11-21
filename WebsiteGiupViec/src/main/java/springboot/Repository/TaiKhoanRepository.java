package springboot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import springboot.Model.TaiKhoan;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer>{
    
}
