'use client'

import { Button } from '@/shared/ui/kit/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/kit/form'
import { Input } from '@/shared/ui/kit/input'
import { useSignUp } from '../model/use-signup'

export function SignUpForm() {
  const { form, onSubmit, isPending } = useSignUp()

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col items-center gap-[15px]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-base leading-[100%] font-medium text-white mb-2'>
                Логин:
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='RenamedUser'
                  {...field}
                  type={'text'}
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-6 text-base border border-gray-700 focus:outline focus:outline-primary'
                />
              </FormControl>
              <FormMessage className='text-[#fb2c36] text-sm' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-base leading-[100%] font-medium text-white mb-2'>
                Email:
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='example@icloud.com'
                  {...field}
                  type={'email'}
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-6 text-base border border-gray-700 focus:outline focus:outline-primary'
                />
              </FormControl>
              <FormMessage className='text-[#fb2c36] text-sm' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-base leading-[100%] font-medium text-white mb-2'>
                Пароль:
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='******'
                  {...field}
                  type={'password'}
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-6 text-base border border-gray-700 focus:outline focus:outline-primary'
                />
              </FormControl>
              <FormMessage className='text-[#fb2c36] text-sm' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-base leading-[100%] font-medium text-white mb-2'>
                Подтвердите пароль:
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='******'
                  {...field}
                  type={'password'}
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-6 text-base border border-gray-700 focus:outline focus:outline-primary'
                />
              </FormControl>
              <FormMessage className='text-[#fb2c36] text-sm' />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type='submit'
          className='w-full mt-4 h-[44px] rounded-[10px] bg-primary text-[#2C2E35] font-semibold text-base hover:bg-[#f0b700] transition-colors duration-200'
        >
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  )
}
