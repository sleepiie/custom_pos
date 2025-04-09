package models

import (
	"time"

	_ "gorm.io/gorm"
)

type User struct {
	Id       uint   `gorm:"primaryKey"`
	Username string `gorm:"unique"`
	Password string
}

type Depositor struct {
	Id      uint `gorm:"primaryKey"`
	Name    string
	Card_id string `gorm:"unique"`
	Address string
	Phone   string
}

type Stock struct {
	Id       uint `gorm:"primaryKey"`
	Name     string
	ImeI     string `gorm:"unique"`
	TypeId   int
	Type     Type `gorm:"foreignKey:TypeId"`
	Quantity int
	UserID   int
	User     User `gorm:"foreignKey:UserID"`
}

type Deposite_Device struct {
	Id           uint `gorm:"primaryKey"`
	Name         string
	IMEI         string `gorm:"unique"`
	Deposit_Date time.Time
	Due_Date     time.Time
	Price        float64
	DepositorID  int
	Depositor    Depositor `gorm:"foreignKey:DepositorID"`
	UserID       int
	User         User `gorm:"foreignKey:UserID"`
}

type Buy struct {
	StockID  uint  `gorm:"primaryKey"`
	Stock    Stock `gorm:"foreignKey:StockID"`
	Price    float64
	Date     time.Time
	Quantity int
}

type Sell struct {
	StockID  uint  `gorm:"primaryKey"`
	Stock    Stock `gorm:"foreignKey:StockID"`
	Price    float64
	Date     time.Time
	Quantity int
}

type Type struct {
	Id   uint `gorm:"primaryKey"`
	Name string
}
