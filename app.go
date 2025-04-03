package main

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	db  *gorm.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file: ", err)
	}
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set in .env file")
	}
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}
	return &App{
		db: db,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetStock() ([]map[string]interface{}, error) {
	var results []map[string]interface{}
	err := a.db.Table("test").Find(&results).Error
	if err != nil {
		return nil, err
	}

	return results, nil
}
