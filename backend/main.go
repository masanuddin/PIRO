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

	r.POST("/login", func(c *gin.Context) {
		var body struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := c.BindJSON(&body); err != nil {
			c.JSON(400, gin.H{"error": "invalid payload"})
			return
		}

		// dummy auth (sementara)
		if body.Email == "test@piro.com" && body.Password == "password" {
			c.JSON(200, gin.H{
				"status": "success",
				"token":  "dummy-jwt-token",
			})
			return
		}

		c.JSON(401, gin.H{"error": "invalid credentials"})
	})
	r.POST("/register", func(c *gin.Context) {
		var body struct {
			Name     string `json:"name"`
			Email    string `json:"email"`
			Phone    string `json:"phone"`
			Password string `json:"password"`
		}

		if err := c.BindJSON(&body); err != nil {
			c.JSON(400, gin.H{"error": "invalid payload"})
			return
		}

		// dummy validation
		if body.Email == "" || body.Password == "" {
			c.JSON(400, gin.H{"error": "email & password required"})
			return
		}

		// nanti: save ke DB
		c.JSON(200, gin.H{
			"status": "registered",
		})
	})
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "PIRO backend is running 🚀",
		})
	})

	r.Run(":8080")
}