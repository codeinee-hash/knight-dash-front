import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card'

interface Props {
  title: string
  form: React.ReactNode
  footerText: React.ReactNode
}

export function AuthLayout({ title, form, footerText }: Props) {
  return (
    <div className='flex justify-center items-center min-h-screen container mx-auto max-sm:px-[20px] py-10'>
      <Card className='w-[500px] rounded-lg bg-[#393939] border-none px-[50px] pt-12 pb-9 max-sm:px-[20px]'>
        <CardHeader>
          <CardTitle className='text-white text-center text-3xl mb-[15px]'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-muted-foreground [&_a]:underline [&_a]:text-[##F5D91F] leading-[100%] text-center'>
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
