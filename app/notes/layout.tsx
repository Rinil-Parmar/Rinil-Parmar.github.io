import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-40">
        {children}
      </main>
      <Footer />
    </>
  );
}
