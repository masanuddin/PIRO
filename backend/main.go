package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.Default()

	// 👇 CORS middleware
	r.Use(cors.Default())

	r.GET("/dates", func(c *gin.Context) {
		c.JSON(200, []string{"2026-01-26", "2026-01-27"})
	})

	r.GET("/timeslots", func(c *gin.Context) {
		c.JSON(200, []string{"08:00", "10:00", "14:00"})
	})

	r.GET("/courts", func(c *gin.Context) {
		c.JSON(200, []string{"Court A", "Court B"})
	})

	r.POST("/reservation", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "success"})
	})

	r.Run(":8080")
}