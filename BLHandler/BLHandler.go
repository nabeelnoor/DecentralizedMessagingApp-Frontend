package handler

import (
	bk "Rest/pk/Book"
	ec "Rest/pk/EncryptionPKG"
	mockbk "Rest/pk/mock"
	"crypto/rsa"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"

	dl "Rest/pk/BLogic"
	ds "Rest/pk/DS"
	// a2 "github.com/nabeelnoor/assignment02IBC"
	// "github.com/karanpratapsingh/tutorials/go/crud/pkg/mocks"
)

// --------------------Encryption Handler functions
type keyPair struct {
	PublicKey  *rsa.PublicKey  `json:"PublicKey"`
	PrivateKey *rsa.PrivateKey `json:"PrivateKey"`
}

func StoreIdentity(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var currentKeyPair keyPair
	json.Unmarshal(body, &currentKeyPair)
	//till here currentKeyPair contain public and private.

	currBlock := prepareBlock("", currentKeyPair.PublicKey.N.String(), currentKeyPair.PublicKey.N.String(), true)
	//append this block to the block chain

	w.Header().Set("Access-Control-Allow-Origin", "*") //setting cors policy to allow by all
	if r.Method == "OPTIONS" {                         //setting cors policy to allow by all
		w.Header().Set("Access-Control-Allow-Headers", "Authorization") // You can add more headers here if needed   //setting cors policy to allow by all
	} else {
		// Your code goes here
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(currentKeyPair)
	}

}

func stringifyPrivateKey(keys keyPair) string { //take key pair and stringify and return private key
	return ""
}

func stringifyPublicKey(keys keyPair) string {
	return ""
}

func parsePrivateKey(key string) {
	//return priv
}

func parsePublicKey(key string) {
	//return public
}

func encryptMsg(msg string, keys keyPair) string {
	retVal := ec.RSA_Encrypt(msg, keys.PrivateKey.PublicKey)
	return retVal
}

func prepareBlock(_hashData string, _sender string, _recv string, _controller bool) ds.Block {
	retVal := ds.Block{DataHash: _hashData, Sender: _sender, Recv: _recv, TimeStamp: time.Now().String(), IdentityBlock: _controller}
	return retVal
}

func stringifyMsgBlock(_content string, _sender string, _recv string) string {
	currMsg := ds.Message{Content: _content, Sender: _sender, Recv: _recv} //till here msg block is ready
	byteData, err := json.Marshal(currMsg)                                 //convert DS to byte
	if err != nil {
		log.Print("Error:", err)
	}
	stringData := string(byteData) //convert that converted byte to string.
	return stringData
	// testByte := []byte(stringData) //convert string to byte for testing
	// var tempStruct ds.Message //make data structure
	// json.Unmarshal(testByte, &tempStruct)
	// temp1 := fmt.Sprintf("", tempStruct) //for printing purpose
	// fmt.Println(temp1)                   //for printing purpose
	// return ""
}

func parseMsgBlock(inputString string) ds.Message {
	ByteData := []byte(inputString)       //convert from string to byte
	var tempStruct ds.Message             //make data structure
	json.Unmarshal(ByteData, &tempStruct) //tempStruct is now contain value.
	// temp1 := fmt.Sprintf("", tempStruct)  //for printing purpose
	// fmt.Println(temp1)                    //for printing purpose
	return tempStruct
}

func AddBook(w http.ResponseWriter, r *http.Request) { //sample function for post
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

func GetGeneratedKeys(w http.ResponseWriter, r *http.Request) {
	priv, pub := ec.GenerateKeys()

	w.Header().Set("Access-Control-Allow-Origin", "*") //setting cors policy to allow by all
	if r.Method == "OPTIONS" {                         //setting cors policy to allow by all
		w.Header().Set("Access-Control-Allow-Headers", "Authorization") // You can add more headers here if needed   //setting cors policy to allow by all
	} else {
		// Your code goes here
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		var temp keyPair
		temp.PublicKey = pub
		temp.PrivateKey = priv
		json.NewEncoder(w).Encode(temp)
	}

}

var BLChain *ds.Block

func populate(chainHead *ds.Block) *ds.Block {
	chainHead = dl.TestData(BLChain)
	// SatoshiToAlice := []a2.BlockData{{Title: "SatoshiToAlice", Sender: "Satoshi", Receiver: "Alice", Amount: 50}, {Title: "ALice2Bob", Sender: "Alice", Receiver: "Bob", Amount: 20}}
	// chainHead = a2.InsertBlock(SatoshiToAlice, chainHead)
	return chainHead
}

func GetBlockChain(w http.ResponseWriter, r *http.Request) {
	BLChain = populate(BLChain)
	//a2.ListBlocks(BLChain) //for printing and debuging purpose

	w.Header().Set("Access-Control-Allow-Origin", "*") //setting cors policy to allow by all
	if r.Method == "OPTIONS" {                         //setting cors policy to allow by all
		w.Header().Set("Access-Control-Allow-Headers", "Authorization") // You can add more headers here if needed   //setting cors policy to allow by all
	} else {
		// Your code goes here
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(BLChain)
	}

	//depopulate
	BLChain = nil

	// w.Header().Add("Content-Type", "application/json")
}

func Greet(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Welcome to Website")
}

// -------------------------------------------------------------------------below here is sample of books.
func GetAllBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(mockbk.Books)
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

func DeleteBook(w http.ResponseWriter, r *http.Request) {
	// Read the dynamic id parameter
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

	// Iterate over all the mock Books
	for index, book := range mockbk.Books {
		if book.Id == BookID {
			// Delete book and send a response if the book Id matches dynamic Id
			mockbk.Books = append(mockbk.Books[:index], mockbk.Books[index+1:]...)

			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode("Deleted")
			break
		}
	}
}