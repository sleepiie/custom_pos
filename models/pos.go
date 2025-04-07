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
	Type     string
	Barcode  string `gorm:"unique"`
	Quantity int
	UserID   uint `gorm:"foreignKey:UserID;references:Id"`
	User     User `gorm:"foreignKey:UserID"`
}

type Deposite_Device struct {
	Id           uint `gorm:"primaryKey"`
	Name         string
	IMEI         string `gorm:"unique"`
	Deposit_Date time.Time
	Due_Date     time.Time
	Price        float64
	DepositorID  uint      `gorm:"foreignKey:DepositorID;references:Id"`
	Depositor    Depositor `gorm:"foreignKey:DepositorID"`
	UserID       uint      `gorm:"foreignKey:UserID;references:Id"`
	User         User      `gorm:"foreignKey:UserID"`
}

type Buy struct {
	StockID  uint  `gorm:"primaryKey;foreignKey:StockID;references:Id"`
	Stock    Stock `gorm:"foreignKey:StockID"`
	Price    float64
	Date     time.Time
	Quantity int
}

type Sell struct {
	StockID  uint  `gorm:"primaryKey;foreignKey:StockID;references:Id"`
	Stock    Stock `gorm:"foreignKey:StockID"`
	Price    float64
	Date     time.Time
	Quantity int
}
