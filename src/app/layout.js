import { Bricolage_Grotesque } from "next/font/google";
import Header from "@/component/header/Header";
import Footer from "@/component/footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import "./global.scss";
import Providers from "./providers";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "NoorLambaba",
  description:
    "Noorlambaba is a platform that connects people with local businesses and services in their area. We provide a convenient way for users to discover and support local businesses, while also helping businesses reach new customers.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolage.className} suppressHydrationWarning>
        <Providers>
          <div className="wrap_overview">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
