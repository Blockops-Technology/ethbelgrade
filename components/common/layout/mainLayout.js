import Footer from "../footer/footer";
import Banner from "../banner/banner";

export default function mainLayout(page) {
  return (
    <main>
      {page}
      <Footer />
      <Banner />
    </main>
  );
}
