import Providers from './providers';
import './globals.css';
import PtfdFooter from '@compoents/components/footer/PtfdFooter';

export const metadata = {
  title: 'PTFD',
  description:
    'PTFD는 장애인을 전문 트레이너와 연결해주는 플랫폼입니다. 맞춤형 훈련과 개별 지도를 제공합니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="images/png/meta-image.png"
          sizes="32x32"
          type="image/png"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* 채팅에서는 footer가 필요 없어서 공통 layout에 넣으면 안될듯 */}
        {/* <PtfdFooter /> */}
      </body>
    </html>
  );
}
