import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { HeadingXSmall } from "baseui/typography";

export const ScanQRPopup = ({ customerName, onClose }) => {
  return (
    <Block
      backgroundColor="white"
      padding="32px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <HeadingXSmall>
        Ask <strong>{customerName}</strong> for the QR Code
      </HeadingXSmall>
      <img src="/icons/qr-scan.svg" height="160px" alt="qrcode" />
      <Block marginTop="64px">
        <Button onClick={() => onClose()}>Complete QR Scan</Button>
      </Block>
    </Block>
  );
};
