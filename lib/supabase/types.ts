export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: string
          name: string
          category: string
          storage_path: string
          public_url: string
          batch: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          category: string
          storage_path: string
          public_url: string
          batch?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          category?: string
          storage_path?: string
          public_url?: string
          batch?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
      }
      youtube_videos: {
        Row: {
          id: string
          title: string
          description: string | null
          youtube_url: string
          youtube_id: string
          category: string
          thumbnail_url: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          youtube_url: string
          youtube_id: string
          category: string
          thumbnail_url?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          youtube_url?: string
          youtube_id?: string
          category?: string
          thumbnail_url?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
      }
      course_info: {
        Row: {
          id: string
          section: string
          content: Json
          updated_at: string | null
        }
        Insert: {
          id?: string
          section: string
          content: Json
          updated_at?: string | null
        }
        Update: {
          id?: string
          section?: string
          content?: Json
          updated_at?: string | null
        }
      }
      counters: {
        Row: {
          key: string
          value: number | null
        }
        Insert: {
          key: string
          value?: number | null
        }
        Update: {
          key?: string
          value?: number | null
        }
      }
    }
  }
}
