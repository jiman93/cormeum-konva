import React, { useState } from 'react';
import { Button, Card, Col, Divider, Modal, Row, Space, theme } from 'antd';

import { VascularCategoryOption } from 'constants/VascularCategory';
import DrawingBoard from 'components/DiagramEditor/diagramBoard';

type Prop = {
  category: VascularCategoryOption | null;
};

const App: React.FC<Prop> = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const imagePath = category?.imagePath || '';

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!category?.imagePath) return;
    const image = await new (window.Image as any)({ src: '/public' + category.imagePath });

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const dataURL = canvas.toDataURL();

    console.log('dataURL', dataURL);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create
      </Button>
      <Modal
        title="Vascular Drawing"
        style={{ top: 20 }}
        width={1200}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={() => setIsClosed(true)}
        destroyOnClose
      >
        <DrawingBoard
          imagePath={imagePath}
          isClosed={isClosed}
          setIsClosed={() => setIsClosed(false)}
        />
      </Modal>
    </>
  );
};

export default App;
