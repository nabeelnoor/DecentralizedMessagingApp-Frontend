package DS

type Message struct {
	Content string `json:"content"`
	Sender  string `json:"Sender"`
	Recv    string `json:"Recv"`
}

type Block struct {
	DataHash      string `json:dataHash`
	CurrentHash   string `json:"currentHash"`
	PrevHash      string `json:"prevHash"`
	PrevPointer   *Block `json:"prevPointer"`
	Sender        string `json:"sender"`
	Recv          string `json:"content"`
	TimeStamp     string `json:"timeStamp"`
	IdentityBlock bool   `json:"IdentityBlock"`
}

// DataHash,CurrentHash,PrevHash,PrevPointer,Sender,Recv,TimeStamp
