import React, { useState } from 'react';
import { MenuProps, theme } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faFileCirclePlus,
  faGear,
  faHospital,
  faHospitalUser,
  faStethoscope,
  faTableList,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  bgColor: string;
}

const items: MenuProps['items'] = [
  {
    label: 'Worklist',
    key: 'worklist',
    icon: <FontAwesomeIcon icon={faTableList} />,
  },
  {
    label: 'Patient',
    key: 'patient',
    icon: <FontAwesomeIcon icon={faHospitalUser} />,
  },
  {
    label: 'Config',
    key: 'config  ',
    icon: <FontAwesomeIcon icon={faGear} />,
  },
  {
    label: 'Healthfund',
    key: 'healthfund',
    icon: <FontAwesomeIcon icon={faCreditCard} />,
  },
  {
    label: 'Booking',
    key: 'booking',
    icon: <FontAwesomeIcon icon={faFileCirclePlus} />,
  },
  {
    label: 'Practice',
    key: 'practice',
    icon: <FontAwesomeIcon icon={faHospital} />,
    disabled: true,
  },
  {
    label: 'Practitioner',
    key: 'practitioner',
    icon: <FontAwesomeIcon icon={faStethoscope} />,
    disabled: true,
  },
];

const AppMenu: React.FC<Props> = ({ bgColor }) => {
  const [current, setCurrent] = useState('worklist');
  const router = useRouter();

  const {
    token: { colorTextLightSolid },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    router.push(`/${e.key}`);
  };

  return (
    <Menu
      style={{ background: bgColor }}
      onClick={onClick}
      selectedKeys={[current]}
      activeKey={current}
      mode="horizontal"
      items={items}
    />
  );
};

export default AppMenu;
