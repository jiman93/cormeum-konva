import { faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Col, Input, Row, Select, Space, Typography, Upload } from 'antd';
import ActionBox from 'components/ActionBox';
import { VascularCategoryOption, VasculatCategory } from 'constants/VascularCategory';
import { useState } from 'react';
import Listing from '../listing';
import DiagramModal from './diagramModal';

const DiagramTab = () => {
  const [category, setCategory] = useState<VascularCategoryOption | null>(null);

  const handleSelect = (_: any, option: VascularCategoryOption | VascularCategoryOption[]) => {
    if (!Array.isArray(option)) setCategory(option);
  };

  return (
    <div>
      <ActionBox label="Create New Attachment">
        <Row>
          <Col offset={2}>
            <Space>
              <Typography.Text>Choose Category</Typography.Text>
              <Select className="w-80" onChange={handleSelect} options={VasculatCategory} />
              <DiagramModal category={category} />
            </Space>
          </Col>
        </Row>
      </ActionBox>

      <div className="w-full mb-4" />

      <ActionBox label="Add New Attachment">
        <Row>
          <Col offset={2}>
            <Space>
              <Typography.Text>File</Typography.Text>
              <Upload>
                <Button icon={<FontAwesomeIcon icon={faUpload} className="mr-2" />}>
                  Choose File
                </Button>
              </Upload>
            </Space>
          </Col>

          <Col span={7} offset={2}>
            <Space>
              <Typography.Text>Description</Typography.Text>
              <Input />
            </Space>
          </Col>

          <Col offset={1}>
            <Space size="large">
              <Checkbox>Case Study</Checkbox>
              <Button type="primary" icon={<FontAwesomeIcon icon={faSave} className="mr-2" />}>
                Upload
              </Button>
            </Space>
          </Col>
        </Row>
      </ActionBox>

      <div className="w-full mb-4" />

      <ActionBox label="View Attachment" className="h-80">
        <Listing />
      </ActionBox>
    </div>
  );
};

export default DiagramTab;
