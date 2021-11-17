package handler

import (
	bk "Rest/pk/mock"
	"encoding/json"
	"net/http"
	// "github.com/karanpratapsingh/tutorials/go/crud/pkg/mocks"
)

func GetAllBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(bk.Books)
}
