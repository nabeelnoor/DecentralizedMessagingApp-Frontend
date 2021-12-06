package EncryptionPKG

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"strings"
)

//Test function
func Test() {
	Packet := "1This is super secret message! 2This is super secret message! 3This is super secret message! 4This is super secret message! \n 5This is super secret message! 6This is super secret message,7This is super secret message! 8This is super secret message! 9This is super secret message! 10This is super secret message! \n 11This is super secret message! 12This is super secret message."
	fmt.Println("before:", Packet)
	privateKey, publicKey := GenerateKeys()
	encryptedMessage := RSA_Encrypt(Packet, *publicKey)
	plainText := RSA_Decrypt(encryptedMessage, *privateKey)
	fmt.Println("After:", plainText)
}

//generate private,public key of 2048
func GenerateKeys() (*rsa.PrivateKey, *rsa.PublicKey) {
	privateKey, _ := rsa.GenerateKey(rand.Reader, 2048)
	return privateKey, &privateKey.PublicKey
}

//perform encyption on packet
func rSA_OAEP_Encrypt(Packet string, key rsa.PublicKey) string {
	cipherText, _ := rsa.EncryptOAEP(sha256.New(), rand.Reader, &key, []byte(Packet), []byte("OAEP Encrypted"))
	return base64.StdEncoding.EncodeToString(cipherText) + "[||||]"
}

//divide packets in chunks and then pass them to rSA_OAEP_Encrypt()
func RSA_Encrypt(Packet string, key rsa.PublicKey) string {
	var finalString string
	var packetCounter int = 0
	if len(Packet) > 170 {
		packetCounter = len(Packet) / (170)
	}
	if len(Packet)%170 != 0 {
		packetCounter = packetCounter + 1
	}
	k := 0
	for ; k < (packetCounter - 1); k++ { //for n-1 packets
		finalString = finalString + rSA_OAEP_Encrypt(Packet[k*170:k*170+170], key)
	}
	finalString = finalString + rSA_OAEP_Encrypt(Packet[k*170:], key) //for last packet
	return finalString
}

//divide cipherText into chunks and then send to rSA_OAEP_Decrypt for decryption
func RSA_Decrypt(cipherText string, privKey rsa.PrivateKey) string {
	var plainText string = ""
	var index int = strings.Index(cipherText, "[||||]")
	for index > 0 {
		chunkCipher := cipherText[:index]
		plainText += rSA_OAEP_Decrypt(chunkCipher, privKey)
		cipherText = cipherText[index+6:]
		index = strings.Index(cipherText, "[||||]")
	}
	return plainText
}

//perform decryption on packet
func rSA_OAEP_Decrypt(cipherText string, privKey rsa.PrivateKey) string {
	ct, _ := base64.StdEncoding.DecodeString(cipherText)
	plaintext, _ := rsa.DecryptOAEP(sha256.New(), rand.Reader, &privKey, ct, []byte("OAEP Encrypted"))
	return string(plaintext)
}

/*
package main //purpose is to make rest api in golang

import (
	ec "Rest/pk/EncryptionPKG"
	"fmt"
)

func main() {
	Packet := "1This is super secret message! 2This is super secret message! 3This is super secret message! 4This is super secret message! \n 5This is super secret message! 6This is super secret message,7This is super secret message! 8This is super secret message! 9This is super secret message! 10This is super secret message! \n 11This is super secret message! 12This is super secret message."
	fmt.Println("before:", Packet)
	privateKey, publicKey := ec.GenerateKeys()
	encryptedMessage := ec.RSA_Encrypt(Packet, *publicKey)
	plainText := ec.RSA_Decrypt(encryptedMessage, *privateKey)
	fmt.Println("After:", plainText)
}
*/
