import Navigation from "../navigation/navigation";
import Footer from "../footer/footer";

export default function mainLayout(page) {
  return (
    <main>
      <Navigation />
      {page}
      <Footer />
    </main>
  );
}