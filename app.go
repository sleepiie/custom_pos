package main

import (
	"context"
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
}

// Greet returns a greeting for the given name

func (a *App) GetStock() ([]map[string]interface{}, error) {
	var results []map[string]interface{}
	err := a.supabase.DB.From("test").Select("*").Execute(&results) // สมมติว่าตารางชื่อ "stock"
	if err != nil {
		return nil, err
	}
	return results, nil
}
