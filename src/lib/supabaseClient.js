import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ugdaonrkzmzggetvtcjx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZGFvbnJrem16Z2dldHZ0Y2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzMTA2NzgsImV4cCI6MjAyNjg4NjY3OH0.y7-fh_zuO7LHw1dyZMTJhVcqJ7Zi9Fm6N6VPb40A2ek'
)
