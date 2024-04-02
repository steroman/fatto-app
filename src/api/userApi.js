import { supabase } from '@/lib/supabaseClient'

export const createAccount = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    throw new Error(error.message)
  } else {
    console.log(data)
  }
}

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    throw new Error(error.message)
  } else {
    console.log(data)
    return data.user
  }
}

export const seeCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    throw new Error(error.message)
  } else {
    console.log(data)
    return data.session?.user
  }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  } else {
    console.log('logged out')
    return undefined
  }
}
