package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/MicahParks/keyfunc"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

var jwks *keyfunc.JWKS

func InitJWKS() error {
	jwksURL := os.Getenv("SUPABASE_JWKS_URL")
	if jwksURL == "" {
		panic("SUPABASE_JWKS_URL not set")
	}

	var err error
	jwks, err = keyfunc.Get(jwksURL, keyfunc.Options{
		RefreshErrorHandler: func(err error) {
			println("JWKS refresh error:", err.Error())
		},
	})
	return err
}

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "missing authorization header",
			})
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		token, err := jwt.Parse(tokenString, jwks.Keyfunc)
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid token",
			})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid claims",
			})
			return
		}

		if claims["iss"] != os.Getenv("SUPABASE_ISSUER") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid issuer",
			})
			return
		}

		c.Set("user", claims)
		c.Next()
	}
}