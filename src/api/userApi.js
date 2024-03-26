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
