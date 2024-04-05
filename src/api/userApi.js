import { supabase } from '@/lib/supabaseClient'

export const createAccount = async (email, password, displayName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName
      }
    }
  })
  if (error) {
    throw new Error(error.message)
  } else {
    return data
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

export const resetPassWithEmail = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/reset-password'
  })
  if (error) {
    throw new Error(error.message)
  } else {
    console.log('ResetPassWithEmail data -->', data)
    return data
  }
}

export const updateUser = async (user) => {
  const { data, error } = await supabase.auth.updateUser({
    // email: user.email,
    password: user.password
  })
  if (error) {
    throw new Error(error.message)
  } else {
    console.log('updateUser data -->', data)
    return data
  }
}
