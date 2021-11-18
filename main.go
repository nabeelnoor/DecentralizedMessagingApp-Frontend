package main //purpose is to make rest api in golang

import (
	hbl "Rest/pk/BLHandler"
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

	router.HandleFunc("/bl", hbl.GetBlockChain).Methods(http.MethodGet) //get api

	router.HandleFunc("/books", hb.GetAllBooks).Methods(http.MethodGet) //get api
	// router.HandleFunc("/books/{id}", hb.GetBook).Methods(http.MethodGet) //get book by id ,, localhost:4000/1
	router.HandleFunc("/books/id", hb.GetBook2).Methods(http.MethodGet)        //get book by id ,another way to do it  ,e.g such as localhost:4000/books/id?val=1&val2=23
	router.HandleFunc("/addbooks", hb.AddBook).Methods(http.MethodPost)        //post api      method :post   localhost:4000/addbooks   body {		"title": "barium ",		 "author":"abcasdasd",		 "desc":"abc"	}
	router.HandleFunc("/updatebook", hb.UpdateBook).Methods(http.MethodPut)    //update api   method:put 	   localhost:4000/updatebook?bookID=81   body {		"title": "barium update",		 "author":"up",		 "desc":"update- abc"	}
	router.HandleFunc("/deletebook", hb.DeleteBook).Methods(http.MethodDelete) //delete api   method: delete   localhost:4000/deletebook?bookID=81

	// router.HandleFunc("/books", func(w http.ResponseWriter, r *http.Request) {
	// 	json.NewEncoder(w).Encode("Hello World")
	// })

	log.Println("API is running!")
	http.ListenAndServe(":4000", router)
}

/*
special thanks to this article:
https://dev.to/karanpratapsingh/build-a-rest-api-with-go-for-beginners-3gp
*/
