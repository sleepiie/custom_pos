package models

import (
	"time"

	_ "gorm.io/gorm"
)

type User struct {
	Id       uint   `gorm:"primaryKey;autoIncrement"`
	Username string `gorm:"unique"`
	Password string
}

type Depositor struct {
	Id      uint `gorm:"primaryKey;autoIncrement"`
	Name    string
	Card_id string `gorm:"unique"`
	Address string
	Phone   string
}

type Stock struct {
	Id       uint `gorm:"primaryKey;autoIncrement"`
	Name     string
	ImeI     string `gorm:"unique"`
	TypeId   uint
	Type     Type `gorm:"foreignKey:TypeId;constraint:OnDelete:CASCADE"`
	Quantity uint
	UserID   uint
	User     User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}

type Deposite_Device struct {
	Id           uint `gorm:"primaryKey;autoIncrement"`
	Name         string
	IMEI         string `gorm:"unique"`
	Deposit_Date time.Time
	Due_Date     time.Time
	Price        float64
	DepositorID  uint
	Depositor    Depositor `gorm:"foreignKey:DepositorID;constraint:OnDelete:CASCADE"`
	UserID       uint
	User         User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}

type Buy struct {
	StockID  uint  `gorm:"primaryKey"`
	Stock    Stock `gorm:"foreignKey:StockID;constraint:OnDelete:CASCADE"`
	Price    float64
	Date     time.Time
	Quantity uint
}

type Sell struct {
	StockID  uint  `gorm:"primaryKey"`
	Stock    Stock `gorm:"foreignKey:StockID;constraint:OnDelete:CASCADE"`
	Price    float64
	Date     time.Time
	Quantity uint
}

type Type struct {
	Id     uint   `gorm:"primaryKey;autoIncrement"`
	Name   string `gorm:"unique"`
	UserId uint
	User   User `gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE"`
}
