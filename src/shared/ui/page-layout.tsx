export function PagesLayout({
  pageHeader,
  pageBody,
}: {
  pageHeader: React.ReactNode
  pageBody: React.ReactNode
}) {
  return (
    <div className='multi-container pt-10'>
      {pageHeader}
      {pageBody}
    </div>
  )
}
