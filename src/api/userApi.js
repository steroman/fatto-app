import { supabase } from '@/lib/supabaseClient'

// export const getCurrentUser = async () => {
//   const {
//     data: { user }
//   } = await supabase
//   return user
// }

export const createAccount = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    throw new Error(error.message)
  } else {
    console.log(data)
  }
  //   return data
}

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    throw new Error(error.message)
  } else {
    console.log(data)
  }
  // return data
}

export const seeCurrentUser = async () => {
  const localUser = await supabase.auth.getSession()
  console.log(localUser)
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  } else {
    console.log('logged out')
  }
}
