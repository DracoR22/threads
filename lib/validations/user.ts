import * as z from 'zod'

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty({ message: 'Please upload your profile picture'}),
    name: z.string().min(3, {message: 'Please input a valid name'}).max(30, {message: 'Please input a valid name'}),
    username: z.string().min(3, {message: 'Please input a valid username'}).max(30, {message: 'Please input a valid username'}),
    bio: z.string().min(3, {message: 'your bio should have at least 3 characters'}).max(1000, {message: 'your bio should have a maximum of 1000 characters'}),
    
})