CREATE DATABASE webgv CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE webgv;

create table loaidv(
	idloaidv int auto_increment primary key,
    tenloai nvarchar(255) not null,
    gioithieu nvarchar(500) not null,
    camket nvarchar(500),
    kynang nvarchar(500),
    anh nvarchar(500)
) engine = innodb;


create table bangphidv(
	iddv int auto_increment primary key,
    idloaidv int not null,
    tendv nvarchar(255) not null,
    mota nvarchar(500),
    gia float,
    donvitinh nvarchar(255),
    constraint fk_idloaidv foreign key (idloaidv) references loaidv(idloaidv) on update cascade on delete cascade
) engine = innodb;

create table khachhang(
	idkh int auto_increment primary key,
    hoten nvarchar(255) not null,
    sdt varchar(10) not null,
    email varchar(255) not null,
    diachi nvarchar(500),
    constraint ck_sdt check (LENGTH(sdt) = 10)
) engine = innodb;

create table nhanvien(
	idnv int auto_increment primary key,
    hoten nvarchar(255) not null,
    gioitinh nvarchar(10),
    ngaysinh date,
    sdt varchar(10) not null unique,
    cmnd varchar(9) not null,
    luong float,
    hinhanh nvarchar(255),
    constraint ck_nv_sdt check (LENGTH(sdt) = 10),
    constraint ck_nv_cmnd check (LENGTH(cmnd) = 9)
) engine = innodb;
alter table nhanvien modify column luong double;

create table taikhoan(
	idtk int auto_increment primary key,
	sdt varchar(10),
    pass nvarchar(255) not null,
    idnv int not null unique,
    quyen nvarchar(255),
    trangthai bit,
    constraint fk_tk_manv foreign key (idnv) references nhanvien(idnv) on update cascade on delete cascade,
    constraint fk_tk_sdt foreign key (sdt) references nhanvien(sdt) on update cascade on delete cascade
) engine = innodb;

create table lichhen(
	idlichhen int auto_increment primary key,
    idnv int,
    idkh int,
    ngay date not null,
    gio time not null,
    diachi nvarchar(500),
    constraint fk_lh_manv foreign key (idnv) references nhanvien(idnv) on update cascade on delete set null,
    constraint fk_lh_makh foreign key (idkh) references khachhang (idkh) on update cascade on delete set null
) engine = innodb;

create table nguoigiupviec(
	idnguoigv int auto_increment primary key,
    hoten nvarchar(255) not null,
    gioitinh nvarchar(10),
    ngaysinh date not null,
    sdt varchar(10) not null,
    cmnd varchar(9) not null,
    quequan nvarchar(500),
    hinhanh nvarchar(500),
    constraint ck_nguoigv_sdt check (LENGTH(sdt) = 10),
    constraint ck_nguoigv_cmnd check (LENGTH(cmnd) = 9)
) engine= innodb;
alter table nguoigiupviec add column del int;
alter table nguoigiupviec add column hopdong int;

create table hopdongdkgv(
	idhddk int auto_increment primary key,
    idnv int,
    idnguoigv int,
    suckhoe nvarchar(255),
    ngayky date not null,
    ngayhethan date,
    phantramluong int,
    kinhnghiem nvarchar(255),
    constraint fk_hddk_manv foreign key(idnv) references nhanvien(idnv) on update cascade on delete set null,
	constraint  fk_hddk_mangv foreign key(idnguoigv) references nguoigiupviec(idnguoigv)  on update cascade on delete set null
) engine = innodb;

create table hopdongthuedv(
	idhdthue int auto_increment primary key,
    idkh int,
    idnguoigv int,
    idnv int,
    ngaythue date not null,
    trangthai nvarchar(255),
    constraint fk_hdthue_makh foreign key (idkh) references khachhang(idkh) on update cascade on delete set null,
    constraint fk_hdthue_ngv foreign key (idnguoigv) references nguoigiupviec(idnguoigv) on update cascade on delete set null,
    constraint fk_hdthue_manv foreign key (idnv) references nhanvien(idnv) on update cascade on delete set null
) engine = innodb;

create table phieuthudv(
	idhdthue int auto_increment,
    iddv int,
    dongia float,
    ngaybatdau date,
    ngayketthuc date,
    giolamviec nvarchar(255),
    diachilam nvarchar(500),
    primary key (idhdthue, iddv),
    constraint fk_phieuthu_mahd foreign key (idhdthue) references hopdongthuedv(idhdthue) on update cascade,
    constraint fk_phieuthu_madv foreign key (iddv) references bangphidv(iddv) on update cascade
) engine = innodb;
