package main //purpose is to make rest api in golang

import (
	b "Rest/pk/Book"
	hb "Rest/pk/Handlers"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	var temp b.Book
	temp.Id = 123
	router := mux.NewRouter()

	router.HandleFunc("/books", hb.GetAllBooks).Methods(http.MethodGet)
	// router.HandleFunc("/books", func(w http.ResponseWriter, r *http.Request) {
	// 	json.NewEncoder(w).Encode("Hello World")
	// })

	log.Println("API is running!")
	http.ListenAndServe(":4000", router)
}
