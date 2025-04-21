package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"custom_pos/models"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx         context.Context
	db          *gorm.DB
	loggedIn    bool
	currentUser *models.User
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
	err = db.AutoMigrate(&models.User{}, &models.Stock{}, &models.Deposite_Device{}, &models.Depositor{}, &models.Buy{}, &models.Sell{}, &models.Type{})
	if err != nil {
		log.Fatal("Failed to migrate database: ", err)
	}
	log.Println("Database migrated successfully!")

	return &App{
		db: db,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) ResizeWindow(width, height int) {
	runtime.WindowSetSize(a.ctx, width, height)
}

func (a *App) Login(username, password string) (string, error) {
	var user models.User
	if err := a.db.Where("username = ?", username).First(&user).Error; err != nil {
		return "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		log.Println("Invalid password: ", err)
		return "", err
	}
	a.loggedIn = true
	a.currentUser = &user
	return user.Username, nil

}

func (a *App) Register(username, password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("Failed to hash password: ", err)
	}
	user := models.User{
		Username: username,
		Password: string(hashedPassword),
	}
	if err := a.db.Create(&user).Error; err != nil {
		return "", err
	}
	return "Registration successful", nil

}

func (a *App) GetCurrentUser() string {
	if a.currentUser != nil {
		return a.currentUser.Username
	}
	return ""
}

func (a *App) IsLoggedIn() bool {
	return a.loggedIn
}

func (a *App) GetStock() ([]models.Stock, error) {
	var stock []models.Stock
	err := a.db.Where("user_id = ?", a.currentUser.Id).
		Preload("Type").
		Select("id, name, ime_i, type_id, quantity").
		Find(&stock).Error
	if err != nil {
		return nil, err
	}

	return stock, nil
}

func (a *App) GetType() ([]models.Type, error) {
	var types []models.Type
	err := a.db.Where("types.user_id = ?", a.currentUser.Id).
		Distinct("types.id , types.name").
		Find(&types).Error
	if err != nil {
		return nil, err
	}
	return types, err
}
func (a *App) AddType(name string) error {
	type_ := models.Type{
		Name:   name,
		UserId: a.currentUser.Id,
	}
	if err := a.db.Create(&type_).Error; err != nil {
		if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
			return fmt.Errorf("category with name '%s' already exists", name)
		}
		if strings.Contains(err.Error(), "foreign key constraint") {
			return fmt.Errorf("invalid user ID: %d", a.currentUser.Id)
		}
		return fmt.Errorf("failed to create category: %w", err)
	}
	return nil
}
