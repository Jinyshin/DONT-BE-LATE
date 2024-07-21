import React, { useEffect, useRef, useState } from 'react';

interface QRCodeGeneratorProps {
  url: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [QRCodeStyling, setQRCodeStyling] = useState<any>(null);

  useEffect(() => {
    import('qr-code-styling').then((QRCodeStylingModule) => {
      setQRCodeStyling(() => QRCodeStylingModule.default);
    });
  }, []);

  useEffect(() => {
    if (QRCodeStyling && qrCodeRef.current) {
      const qrCode = new QRCodeStyling({
        width: 150,
        height: 150,
        data: url,
      });
      qrCode.append(qrCodeRef.current);
    }
  }, [QRCodeStyling, url]);

  return <div ref={qrCodeRef} />;
};

export default QRCodeGenerator;
