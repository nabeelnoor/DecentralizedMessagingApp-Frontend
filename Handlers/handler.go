package handler

import (
	bk "Rest/pk/Book"
	mockbk "Rest/pk/mock"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
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

func GetBook(w http.ResponseWriter, r *http.Request) {
	// Read dynamic id parameter
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	fmt.Println(id, "test")
	// Iterate over all the mock books
	for _, book := range mockbk.Books {
		if book.Id == id {
			// If ids are equal send book as a response
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)

			json.NewEncoder(w).Encode(book)
			break
		}
	}
}

func GetBook2(w http.ResponseWriter, r *http.Request) {
	// Read dynamic id parameter
	var BookID int
	fmt.Println(r.URL)
	allParams := r.URL.Query()
	for k, v := range allParams {
		fmt.Println(k, "=>", v)                                         //print key value pair of all params
		appendV := strings.Join(v, "")                                  //append slice of string to single string
		fmt.Println("after converting string slice to string", appendV) //print
		finalOutput, _ := strconv.Atoi(appendV)                         //convert string to number
		if k == "bookID" {
			BookID = finalOutput
		}

		if finalOutput == 23 { //just for debuggin
			fmt.Println("holla")
		}
	}

	// fmt.Println(id)
	// Iterate over all the mock books
	for _, book := range mockbk.Books {
		if book.Id == BookID {
			// If ids are equal send book as a response
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)

			json.NewEncoder(w).Encode(book)
			break
		}
	}
}

func UpdateBook(w http.ResponseWriter, r *http.Request) {
	// Read dynamic id parameter
	var BookID int
	fmt.Println(r.URL)
	allParams := r.URL.Query()
	for k, v := range allParams {
		fmt.Println(k, "=>", v)                                         //print key value pair of all params
		appendV := strings.Join(v, "")                                  //append slice of string to single string
		fmt.Println("after converting string slice to string", appendV) //print
		finalOutput, _ := strconv.Atoi(appendV)                         //convert string to number
		if k == "bookID" {
			BookID = finalOutput
		}

		if finalOutput == 23 { //just for debuggin
			fmt.Println("holla")
		}
	}

	defer r.Body.Close()
	body, _ := ioutil.ReadAll(r.Body)

	var updatedBook bk.Book
	json.Unmarshal(body, &updatedBook)

	// Iterate over all the mock Books
	for index, book := range mockbk.Books {
		if book.Id == BookID {
			// Update and send a response when book Id matches dynamic Id
			book.Title = updatedBook.Title
			book.Author = updatedBook.Author
			book.Desc = updatedBook.Desc

			mockbk.Books[index] = book
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)

			json.NewEncoder(w).Encode("Updated")
			break
		}
	}
}
