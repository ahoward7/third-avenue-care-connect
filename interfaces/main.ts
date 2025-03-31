export type AccountType = 'family' | 'sitter'

export interface ChildProfile {
  name: string
  age: number
}

export interface FamilyProfile {
  id?: string | number
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
  id?: string | number
  email: string
  password: string
  passwordResetToken: string
  passwordResetExpires: Date
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
  id: string | number
  name: string
  image: string
  address: string
  timing: string
  sitter: string | null
  kids: ChildProfile[]
  description: string
}

export interface LoginForm {
  email: string
  password: string
}
