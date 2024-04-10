import { supabase } from '@/lib/supabaseClient'

const TABLE_NAME = 'user_settings'

export const fetchSortingPreference = async (userId) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('sorting_preference')
    .eq('user_id', userId)

  if (error) {
    throw new Error(error.message)
  } else {
    const sortingPreferenceValue = data[0].sorting_preference
    console.log(sortingPreferenceValue)
    return sortingPreferenceValue
  }
}

export const updateSortingPreference = async (userId, sortingPreference) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ sorting_preference: sortingPreference })
    .eq('user_id', userId)

    if (error) {
    throw new Error(error.message)
    }
}