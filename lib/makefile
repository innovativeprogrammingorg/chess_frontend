
CFLAGS = 

CC=gcc
FILES =   ./*.c

.PHONY: clean

all: gen

gen: 
	$(CC)  $(FILES) -o ./gen $(CFLAGS)

clean: 
	rm -f ./gen
fclean:
	rm -f ./gen
	
re: fclean all
