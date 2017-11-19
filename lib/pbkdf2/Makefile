ifdef WITH_OPENMP
  CFLAGS += -fopenmp -DWITH_OPENMP
  LDFLAGS += -fopenmp
endif

CFLAGS +=  -O3 -g -Wall -Werror -Wextra -pedantic


CC=gcc
CFLAGS= -std=c99 -I$(IDIR) -L$(ILIB) -lcrypto
FILES =   ./*.c 
OBJECTS= $(foreach x, $(basename $(wildcard *.c)), $(x).o)
.PHONY: clean

all: minishell 

minishell: 
	$(CC)  $(FILES) -o main $(CFLAGS)

clean: 
	rm -f $(wildcard *.o) 
fclean:
	rm -f $(wildcard *.o)

re: fclean all
