package main //purpose is to make rest api in golang

import (
	rsa1 "Rest/pk/rsa"
	"fmt"
)

func main() {

	data := "this is the life saqib zeb zulkifal khan Sender: M. Nabeel Noor Khan,this is the life saqib zeb zulkifal khan Sender: M. Nabeel Noor Khan,this is the life saqib zeb zulkifal khan Sender: M. Nabeel Noor Khan,this is the life saqib zeb zulkifal khan Sender: M. Nabeel Noor Khan"
	fmt.Println("before encryption:", data)
	databyte := []byte(data)
	fmt.Println("After converting to databyte:", databyte)
	// fmt.Println(string(databyte))
	apriv, bpub := rsa1.GenerateKeyPair(2048)
	// fmt.Println("priv:", apriv, '\n', "pub:", bpub)
	cipherData := rsa1.EncryptWithPublicKey(databyte, bpub)
	fmt.Println("After encryption:", cipherData)
	result := rsa1.DecryptWithPrivateKey(cipherData, apriv)
	// result:=string(result[:])
	// fmt.Println(result[:])
	fmt.Println("After dec:", string(result))
}

/*
special thanks to this article:
https://dev.to/karanpratapsingh/build-a-rest-api-with-go-for-beginners-3gp
*/
