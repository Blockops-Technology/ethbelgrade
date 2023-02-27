import Footer from "../footer/footer";

export default function mainLayout(page) {
  return (
    <main>
      {page}
      <Footer />
    </main>
  );
}