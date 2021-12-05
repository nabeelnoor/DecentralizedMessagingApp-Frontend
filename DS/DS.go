package DS

type Message struct {
	Recv    string `json:"recv"`
	Sender  string `json:"sender"`
	Content string `json:"content"`
}

type Block struct {
	DataHash    string `json:dataHash`
	CurrentHash string `json:"currentHash"`
	PrevHash    string `json:"prevHash"`
	PrevPointer *Block `json:"prevPointer"`
	Sender      string `json:"sender"`
	Recv        string `json:"content"`
	TimeStamp   string `json:"timeStamp"`
}

// DataHash,CurrentHash,PrevHash,PrevPointer,Sender,Recv,TimeStamp
