export type AccountType = 'family' | 'sitter'

export interface ChildProfile {
  name: string
  age: number
}

export interface FamilyProfile {
  id?: string
  image: string
  displayName: string
  bio: string
  email: string
  password: string
  phone: string
  address: string
  children: ChildProfile[]
  profileType: 'family'
  isApproved: boolean
  isCompleted: boolean
}

export interface SitterProfile {
  id?: string
  image: string
  firstName: string
  lastName: string
  bio: string
  email: string
  password: string
  phone: string
  profileType: 'sitter'
  isApproved: boolean
  isCompleted: boolean
}

export interface Admin {
  id?: string
  email: string
  password: string
  passwordResetToken: string
  passwordResetExpires: Date
}

export interface UserSession {
  userId: string | number
  email: string
}

export interface FamilySignupForm {
  displayName: string
  email: string
  phone: string
  isConfirmed: boolean
  type: string
}

export interface SitterSignupForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  isConfirmed: boolean
  type: string
}

export interface Filter {
  id: string | number
  name: string
  checked: boolean
}

export interface Job {
  id: string
  family: FamilyProfile
  sitter: SitterProfile | null
  startTime: string
  endTime: string
  date: string
  description: string
}

export interface JobPut {
  id: string
  sitter: string | null
}

export type JobPost = Omit<Job, 'id'>

export interface LoginForm {
  email: string
  password: string
}

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}
