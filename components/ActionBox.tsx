import { theme } from 'antd';

type Props = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

const ActionBox: React.FC<Props> = ({ children, label, className = '', style }) => {
  const { token } = theme.useToken();
  return (
    <>
      <div className="border-2 rounded-lg shadow" style={{ borderColor: token.colorBorder }}>
        <div className="relative h-0 w-full">
          <div className="absolute right-4 -top-3 text-center">
            <div className="flex px-2" style={{ background: token.colorBgContainer }}>
              {label}
            </div>
          </div>
        </div>

        <div className={`p-4 ${className}`} style={style}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ActionBox;
