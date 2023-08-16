'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../ui/button"
import z from 'zod'
import { Input } from "../ui/input"
import { updateUser } from "@/lib/actions/user.actions"
import { usePathname, useRouter } from "next/navigation"
import { CommentValidation } from "@/lib/validations/thread"
import Image from "next/image"
import { addCommentToThread } from "@/lib/actions/thread.actions"


interface Props {
    threadId: string
    currentUserImg: string
    currentUserId: string
}

const Comment = ({ threadId, currentUserImg, currentUserId}: Props) => {

  const pathname = usePathname()
  const router = useRouter()
 
  const form = useForm({
   resolver: zodResolver(CommentValidation), 
   defaultValues: {
    thread: '',
   }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
   await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)

      form.reset()
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
    <FormField control={form.control} name="thread" render={({ field }) => (
          <FormItem className="flex items-center gap-3 w-full">
            <FormLabel>
              <Image src={currentUserImg} alt="User" width={48} height={48} className="rounded-full object-cover"/>
            </FormLabel>
            <FormControl className="border-none bg-transparent">
              <Input type="text" {...field} placeholder="Comment..." className="no-focus text-light-1 outline-none"/>
            </FormControl>
          </FormItem>
        )}
      />

      <Button type="submit" className="comment-form_btn">
        Reply
      </Button>
    </form>
    </Form>
  )
}

export default Comment