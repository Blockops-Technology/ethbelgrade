import Footer from "../footer/footer";
import Banner from "../banner/banner";
import Navigation from "../navigation/navigation";

export default function mainLayout(page) {
  return (
    <main>
      <Navigation />
      {page}
      <Footer />
    </main>
  );
}
