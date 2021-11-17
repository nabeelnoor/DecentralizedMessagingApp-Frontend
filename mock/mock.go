package mocks

import (
	bk "Rest/pk/Book"
)

var Books = []bk.Book{
	{
		Id:     1,
		Title:  "Golang",
		Author: "Gopher",
		Desc:   "A book for Go",
	},
}
