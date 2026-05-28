interface Props {
  pageHeader: React.ReactNode
  pageBody: React.ReactNode
}

export function PageLayout({ pageHeader, pageBody }: Props) {
  return (
    <div className='multi-container pt-10'>
      {pageHeader}
      {pageBody}
    </div>
  )
}
