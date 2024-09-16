import type { Metadata } from "next";
// import "./globals.css";
import "/public/assets/css/bootstrap.min.css";
import "/public/assets/css/all.min.css";
import "/public/assets/css/animate.css";
import "/public/assets/css/magnific-popup.css";
import "/public/assets/css/meanmenu.css";
import "/public/assets/css/swiper-bundle.min.css";
import "/public/assets/css/nice-select.css";
import "/public/assets/css/main.css";
import toast, { Toaster } from "react-hot-toast";

import { Kumbh_Sans } from "next/font/google";

const kumbh = Kumbh_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbh.className}`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
