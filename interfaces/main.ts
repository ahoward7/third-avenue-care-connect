export type AccountType = 'family' | 'sitter'

export interface ChildProfile {
  name: string
  age: number
}

export interface FamilyProfile {
  id?: string | number
  image: string
  name: string
  bio: string
  email: string
  password: string
  phone: string
  address: string
  notes: string
  children: ChildProfile[]
  profileType: 'family'
  isApproved: boolean
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
