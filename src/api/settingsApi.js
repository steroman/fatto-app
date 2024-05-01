import { supabase } from '@/lib/supabaseClient'

const TABLE_NAME = 'user_settings'

export const fetchDarkModeSetting = async (userId) => {
  const { data, error } = await supabase.from(TABLE_NAME).select('dark_mode').eq('user_id', userId)

  if (error) {
    throw new Error(error.message)
  }
  return data[0].dark_mode
}

export const updateDarkModeSetting = async (userId, darkMode) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ dark_mode: darkMode })
    .eq('user_id', userId)
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0].dark_mode
}

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

export const fetchHideCompletedSetting = async (userId) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('hide_completed')
    .eq('user_id', userId)
  if (error) {
    throw new Error(error.message)
  }
  return data[0].hide_completed
}

export const updateHideCompletedSetting = async (userId, hideCompleted) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ hide_completed: hideCompleted })
    .eq('user_id', userId)
    .select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0].hide_completed
}
