package services

import (
	"errors"
	"piro/models"
	"piro/store"
)

func Register(user models.User) error {
	if _, exists := store.Users[user.Email]; exists {
		return errors.New("user already exists")
	}

	store.Users[user.Email] = user
	return nil
}

func Login(email, password string) (models.User, error) {
	user, exists := store.Users[email]
	if !exists || user.Password != password {
		return models.User{}, errors.New("invalid credentials")
	}

	return user, nil
}