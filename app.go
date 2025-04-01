package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	supa "github.com/nedpals/supabase-go"
)

// App struct
type App struct {
	ctx      context.Context
	supabase *supa.Client
}

// NewApp creates a new App application struct
func NewApp() *App {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file: ", err)
	}
	supabaseUrl := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_KEY")
	if supabaseUrl == "" || supabaseKey == "" {
		log.Fatal("SUPABASE_URL or SUPABASE_KEY is not set in .env file")
	}
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)
	return &App{
		supabase: supabase,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	result := a.TestSupabaseConnection()
	log.Println(result)
}

// Greet returns a greeting for the given name

func (a *App) TestSupabaseConnection() string {
	var results []map[string]interface{}
	err := a.supabase.DB.From("test").Select("*").Execute(&results)
	if err != nil {
		return fmt.Sprintf("Connection failed: %v", err)
	}
	return fmt.Sprintf("Connection successful! Data: %v", results)
}
