#define _GNU_SOURCE
#include <stdio.h>

#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <sys/syscall.h>
#include <linux/random.h>

int main(int argc, char* argv[]){
	int length = atoi(argv[1]);
	char key[length];
	int tmp;
	for(int i = 0;i<length;i++){
		syscall(SYS_getrandom, &tmp, sizeof(uint8_t), 0);
		tmp = tmp%35;
		char r = (char) tmp;
		if(r<10){
			r = r + 48;
		}else{
			r = r + 87;
		}
		key[i] = r;
	}
	key[length - 1] = '\0';
   	printf("%s",key);
   	return EXIT_SUCCESS;
}