import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow mb-5">404</p>
      <h1 className="heading">This part is missing.</h1>
      <p className="copy mx-auto mt-6">The page you were looking for isn&apos;t here. It may have moved, or never existed.</p>
      <Link href="/" className="btn-primary mt-9">
        Back to home
      </Link>
    </section>
  );
}
