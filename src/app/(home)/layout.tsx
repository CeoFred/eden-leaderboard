import SmoothCursor from '~/components/miscellaneous/cursor'
import Footer from '~/components/navigation/footer'
import Navbar from '~/components/navigation/header'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      {children}
      <SmoothCursor />
      <Footer />
    </>
  )
}
