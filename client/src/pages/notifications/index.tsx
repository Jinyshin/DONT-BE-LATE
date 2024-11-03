import { useEffect, useState } from 'react';
import PushModalExample from  '../../components/Modal/PushModalExample';;

export default function NotificationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    // Service Worker로부터 데이터 수신
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'OPEN_MODAL') {
          // Service Worker에서 전달된 데이터를 모달에 설정
          setModalData(event.data.data);
          setIsModalOpen(true);
        }
      });
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div>
      <h1>Notifications Page</h1>
      {isModalOpen && <PushModalExample data={modalData} onClose={closeModal} />}
    </div>
  );
}
