package main

import (
<<<<<<< Updated upstream
	"os"
	"piro/handlers"
	"piro/middleware"

=======
>>>>>>> Stashed changes
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(cors.New(middleware.CORSMiddleware()))

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "PIRO backend running 🚀",
		})
	})

<<<<<<< Updated upstream
	r.POST("/login", handlers.Login)
	r.POST("/register", handlers.Register)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
=======
	r.Run(":8080")
}
>>>>>>> Stashed changes
