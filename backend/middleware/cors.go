package middleware

import "github.com/gin-contrib/cors"

func CORSMiddleware() cors.Config {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Content-Type", "Authorization"}
	return config
}