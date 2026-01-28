package handlers

import "github.com/gin-gonic/gin"

func Me(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(401, gin.H{
			"error": "unauthorized",
		})
		return
	}

	c.JSON(200, gin.H{
		"user": user,
	})
}