import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import img1 from '@assets/home-img/search.png';
import { Affix } from 'antd';
import { Link } from 'react-router-dom';

const DentalDetails: React.FC = () => {
  const [bottom, setBottom] = React.useState<number>(100);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBackToHome} className={styles.homeButton}>
        Quay về trang chủ
      </button>

      <div className={styles.header}>
        <img className={styles.headerImage} src={img1} alt="Dental Clinic" />
        <div className={styles.clinicInfo}>
          <h1>Hệ thống Nha Khoa Uy Tín</h1>
          <p>Cơ sở 1: Lầu 2, Trung tâm Thời trang - Vàng Bạc - Đá quý Bến Thành, số 30-36 Phan Bội Châu, Phường Bến Thành, Quận 1, Tp. HCM</p>
          <p>Cơ sở 2: 166 đường Đồng Văn Cống, Phường Thạnh Mỹ Lợi, Quận 2, Tp. HCM</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={styles.tab}>Đặt lịch khám</button>
        <button className={styles.tab}>Giới thiệu chung</button>
        <button className={styles.tab}>Thế mạnh chuyên môn</button>
        <button className={styles.tab}>Trang thiết bị</button>
        <button className={styles.tab}>Chi phí dịch vụ</button>
      </div>

      <div className={styles.content}>
        <h2>Giới thiệu chung</h2>
        <div className={styles.mainPoint}>
          Nha khoa Hoa Hồng Phương Đông – Since 2000 - 2nd All On 4 Viet Nam...
        </div>
        <div className={styles.subPoint}>
          • Đội ngũ bác sĩ giỏi, giàu kinh nghiệm từ 17 đến 26 năm trong nghề.
        </div>
        <div className={styles.subPoint}>
          • Các bác sĩ đều tốt nghiệp đại học chính quy khoa Răng-Hàm-Mặt...
        </div>
        <div className={styles.mainPoint}>
          • Địa chỉ:
        </div>
        <div className={styles.subPoint}>
          • Cơ sở 1: Trung tâm vàng bạc đá quý, 30-36 Phan Bội Châu...
        </div>
        <div className={styles.subPoint}>
          • Cơ sở 2: 166 đường Đồng Văn Cống, Phường Thạnh Mỹ Lợi...
        </div>
        <div className={styles.subPoint}>
          • Thời gian làm việc: Thứ 2 - Thứ 7: Từ 08h30 đến 18h30
        </div>
        <div className={styles.subPoint}>
          • Hình thức thanh toán: Tiền mặt, chuyển khoản, quẹt thẻ
        </div>

        <h2>Thế mạnh chuyên môn</h2>
        <div className={styles.mainPoint}>
          • Trồng răng Implant All on 4, all on 6: là loại phục hình răng tức thì, mang lại cho bạn nhiều lợi ích như: Chi phí bảo hành, bảo trì thấp; dễ dàng vệ sinh răng miệng và có tính thẩm mỹ cao.
        </div>
        <div className={styles.subPoint}>
          • Cấy ghép implant: sử dụng thiết bị và công nghệ mới và tốt nhất, bác sĩ giỏi, có nhiều kinh nghiệm đặt trụ implant chính xác
        </div>
        <div className={styles.mainPoint}>
          • Nhổ răng khôn: sử dụng công nghệ nhổ răng khôn Piezo + led (Đức) giúp phẫu thuật răng khôn ngầm trở nên dễ dàng hơn và nhanh chóng hơn, bệnh nhân ít có dấu hiệu sang chấn và ít đau hơn rất nhiều.
        </div>

        <h2>Trang thiết bị</h2>
        <div className={styles.mainPoint}>
          • Máy chụp PaX-i3D SMART CBCT Scanner: cho phép khảo sát hình ảnh 3 chiều của toàn bộ cấu trúc vùng hàm mặt, giúp bác sĩ phát hiện sớm những bệnh liên quan đến hệ thống răng hàm mặt. Kỹ thuật CBCT giúp cho việc điều trị được thực hiện nhanh chóng, chính xác, an toàn cao. Đặc biệt trong những trường hợp can thiệp phức tạp chỉ CBCT mới có thể đem lại hình ảnh rõ nét, độ biến dạng thấp mà các phim X-quang thông thường không đáp ứng được.
        </div>
        <div className={styles.subPoint}>
          • Máy đọc phim Apex X-ray: Hệ thống đọc hình ảnh Scan eXam ™ luôn cung cấp hình ảnh với độ chi tiết cao và độ tương phản tuyệt vời. Phạm vi năng động rộng liên kết với hình ảnh đầu ra đảm bảo chẩn đoán tốt nhất có thể
        </div>
        <div className={styles.subPoint}>
          • Máy scan 3D Trios – 3 Shape: với máy này, chúng ta không cần dùng vật liệu nha khoa (alginate, cao su,..) để lấy dấu răng trong miệng bệnh nhân như trước đây, điều mà hay gây khó chịu cho bệnh nhân, thay vào đó, máy scan cho phép đo chính xác mọi góc cạnh và kích thước của răng và mô mềm quanh răng rất nhanh – gọn, tạo cảm giác thoải mái cho bệnh nhân. Độ chính xác cao, tích hợp AI thông minh.
        </div>
      </div>

      <div className={styles.bookingSection}>
        <Affix offsetBottom={bottom}>
          <button className={styles.bookingButton}>
            <Link to={`/customer/booking-page/${id}`}>Đặt lịch khám ngay</Link>
          </button>
        </Affix>
      </div>
    </div>
  );
};

export default DentalDetails;
