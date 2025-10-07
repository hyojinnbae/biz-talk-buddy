export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cards: {
        Row: {
          category: string | null
          context: string | null
          created_at: string | null
          example_usage: string | null
          id: string
          is_bookmarked: boolean | null
          original_utterance: string
          rephrased_expression: string
          session_id: string
          tip: string | null
        }
        Insert: {
          category?: string | null
          context?: string | null
          created_at?: string | null
          example_usage?: string | null
          id?: string
          is_bookmarked?: boolean | null
          original_utterance: string
          rephrased_expression: string
          session_id: string
          tip?: string | null
        }
        Update: {
          category?: string | null
          context?: string | null
          created_at?: string | null
          example_usage?: string | null
          id?: string
          is_bookmarked?: boolean | null
          original_utterance?: string
          rephrased_expression?: string
          session_id?: string
          tip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          payment_key: string | null
          plan_id: string
          raw_response: Json | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          payment_key?: string | null
          plan_id: string
          raw_response?: Json | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          payment_key?: string | null
          plan_id?: string
          raw_response?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          amount: number
          created_at: string | null
          duration_months: number
          id: string
          monthly_limit: number
          name: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          duration_months: number
          id?: string
          monthly_limit: number
          name: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          duration_months?: number
          id?: string
          monthly_limit?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          english_level: number | null
          id: string
          last_login_at: string | null
          name: string | null
          role: string | null
          social_login_provider: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          english_level?: number | null
          id: string
          last_login_at?: string | null
          name?: string | null
          role?: string | null
          social_login_provider?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          english_level?: number | null
          id?: string
          last_login_at?: string | null
          name?: string | null
          role?: string | null
          social_login_provider?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          english_level_max: number | null
          english_level_min: number | null
          estimated_duration: number | null
          id: string
          is_active: boolean | null
          prompt: string
          role_target: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          english_level_max?: number | null
          english_level_min?: number | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean | null
          prompt: string
          role_target?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          english_level_max?: number | null
          english_level_min?: number | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean | null
          prompt?: string
          role_target?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          cards_generated: boolean | null
          created_at: string | null
          duration_minutes: number | null
          end_time: string | null
          feedback: string | null
          feedback_comment: string | null
          id: string
          scenario_id: string | null
          start_time: string | null
          status: string | null
          transcript: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cards_generated?: boolean | null
          created_at?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          feedback?: string | null
          feedback_comment?: string | null
          id?: string
          scenario_id?: string | null
          start_time?: string | null
          status?: string | null
          transcript?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cards_generated?: boolean | null
          created_at?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          feedback?: string | null
          feedback_comment?: string | null
          id?: string
          scenario_id?: string | null
          start_time?: string | null
          status?: string | null
          transcript?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_plans: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          monthly_limit: number
          plan_id: string
          trial_limit: number | null
          updated_at: string | null
          used_count_this_month: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          monthly_limit: number
          plan_id: string
          trial_limit?: number | null
          updated_at?: string | null
          used_count_this_month?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          monthly_limit?: number
          plan_id?: string
          trial_limit?: number | null
          updated_at?: string | null
          used_count_this_month?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_plans_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          created_at: string | null
          favorite_scenario_ids: string[] | null
          id: string
          last_session_date: string | null
          streak_days: number | null
          total_cards_generated: number | null
          total_duration_minutes: number | null
          total_sessions: number | null
          updated_at: string | null
          user_id: string
          weak_expression_categories: string[] | null
        }
        Insert: {
          created_at?: string | null
          favorite_scenario_ids?: string[] | null
          id?: string
          last_session_date?: string | null
          streak_days?: number | null
          total_cards_generated?: number | null
          total_duration_minutes?: number | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id: string
          weak_expression_categories?: string[] | null
        }
        Update: {
          created_at?: string | null
          favorite_scenario_ids?: string[] | null
          id?: string
          last_session_date?: string | null
          streak_days?: number | null
          total_cards_generated?: number | null
          total_duration_minutes?: number | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id?: string
          weak_expression_categories?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
