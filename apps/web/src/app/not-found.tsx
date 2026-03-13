import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-600">Page not found.</p>
      <Link href="/" className="text-blue-600 underline">
        Back to banner switcher
      </Link>
    </main>
  )
}
