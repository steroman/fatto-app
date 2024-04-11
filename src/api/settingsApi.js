import { supabase } from '@/lib/supabaseClient'

const TABLE_NAME = 'user_settings'

export const fetchSortingPreference = async (userId) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('sorting_preference')
    .eq('user_id', userId)

  if (error) {
    throw new Error(error.message)
  }

  return data[0].sorting_preference
}

export const updateSortingPreference = async (userId, sortingPreference) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ sorting_preference: sortingPreference })
    .eq('user_id', userId)
    .select()

    if (error) {
      throw new Error(error.message)
    }
    return data[0].sorting_preference
}