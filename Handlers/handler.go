package handler

import (
	bk "Rest/pk/Book"
	mockbk "Rest/pk/mock"
	"encoding/json"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	// "github.com/karanpratapsingh/tutorials/go/crud/pkg/mocks"
)

func GetAllBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(mockbk.Books)
}

func AddBook(w http.ResponseWriter, r *http.Request) {
	// Read to request body
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var book bk.Book
	json.Unmarshal(body, &book)

	// Append to the Book mocks
	book.Id = rand.Intn(100)
	mockbk.Books = append(mockbk.Books, book)

	// Send a 201 created response
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Created")
}
