package BLogic

import (
	ds "Rest/pk/DS"
	"crypto/sha256"
	"fmt"
	"time"
)

//calculate string of Block except currentHash.
func CalculateHash(inputBlock *ds.Block) string {
	transaction_To_String := fmt.Sprintf("%v", inputBlock.DataHash)
	transaction_To_String += fmt.Sprintf("%v", inputBlock.PrevHash)
	transaction_To_String += fmt.Sprintf("%v", inputBlock.PrevPointer)
	transaction_To_String += fmt.Sprintf("%v", inputBlock.Recv)
	transaction_To_String += fmt.Sprintf("%v", inputBlock.Sender)
	transaction_To_String += fmt.Sprintf("%v", inputBlock.TimeStamp)
	var calculatedHash = fmt.Sprintf("%x\n", sha256.Sum256([]byte(transaction_To_String)))
	return calculatedHash
}

//verify block chain from new to gensis block
func VerifyChain(chainHead *ds.Block) bool {
	compromisedFlag := false

	var currPtr = chainHead
	for currPtr != nil { //for block iteration
		var calculatedHashOfCurrentBlockToVerify = CalculateHash(currPtr)
		if currPtr.CurrentHash != calculatedHashOfCurrentBlockToVerify {
			compromisedFlag = true
			break
		}
		currPtr = currPtr.PrevPointer
	}

	if compromisedFlag {
		println("Verification Status:This blockchain has been compromised")
		return false
	} else {
		println("Verification Status:This blockchain is a valid blockchain")
		return true
	}
}

func InsertBlock(blockData ds.Block, chainHead *ds.Block) *ds.Block {
	//call function to calculate hash ds.Message ,encrypt with priavte key of sender and public key of recv
	//need function to get current sender,recv or parameter
	var currentHashData string = "hashofData"
	var currentSender string = "currentSender"
	var currentRecv string = "currentRecv"
	//preparing block data to be ready to insert in blockChain

	if chainHead == nil { //chainhead is nill so create new block and chain head pointed to this newly created block
		var current_Block_To_Insert = ds.Block{DataHash: currentHashData, PrevHash: "", PrevPointer: nil, Sender: currentSender, Recv: currentRecv, TimeStamp: time.Now().String()}
		current_Block_To_Insert.CurrentHash = CalculateHash(&current_Block_To_Insert)
		chainHead = &current_Block_To_Insert
		return chainHead
	} else { //newly created block point to block which is previously pointed by chainhead and now chainhead will point to newly created block.
		var current_Block_To_Insert = ds.Block{DataHash: currentHashData, PrevHash: chainHead.CurrentHash, PrevPointer: chainHead, Sender: currentSender, Recv: currentRecv, TimeStamp: time.Now().String()}
		current_Block_To_Insert.CurrentHash = CalculateHash(&current_Block_To_Insert)
		chainHead = &current_Block_To_Insert
		return chainHead
	}
}

//contain error resolved it.
func TestData(handle *ds.Block) *ds.Block {
	// tempMsg := ds.Message{Sender: "Sender", Recv: "Recv", Content: "Content"}
	// handle = InsertBlock(tempMsg, handle)
	// handle = InsertBlock(tempMsg, handle)
	// handle = InsertBlock(tempMsg, handle)
	// return handle
	var handle2 ds.Block
	return &handle2
}

func ListBlocks(chainHead *ds.Block) {
	fmt.Println("\n\n--------------------------Listing Blocks (most recent first) ... ---------------------\n\n ")
	var currPtr = chainHead
	for currPtr != nil { //for block iteration
		fmt.Println("\n-----------------Block-----------------")
		// fmt.Println("Following are its transactions:-")
		// DataHash,CurrentHash,PrevHash,PrevPointer,Sender,Recv,TimeStamp
		fmt.Printf("{DataHash:%s ,CurrentHash:%s,PrevHash:%s,Sender:%s Receiver:%s,TimeStamp:%s} \n", currPtr.DataHash, currPtr.CurrentHash, currPtr.PrevHash, currPtr.Sender, currPtr.Recv, currPtr.TimeStamp)
		currPtr = currPtr.PrevPointer
	}
	fmt.Println("--------------------------------------------------------------------------------------\n\n ")
}
