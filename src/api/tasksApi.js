import { supabase } from '@/lib/supabaseClient'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*')
  if (error) {
    throw new Error(error.message)
  } else {
    // console.log(data)
    return data
  }
}

export const createTask = async (task) => {
  const { error } = await supabase.from(TABLE_NAME).insert(task)
  if (error) {
    throw new Error(error.message)
  }
}

export const updateTask = async (task) => {
  const { error } = await supabase.from(TABLE_NAME).update(task).eq('id', task.id)
  if (error) {
    throw new Error(error.message)
  }
}

export const deleteTask = async (task) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', task.id)
  if (error) {
    throw new Error(error.message)
  }
}
