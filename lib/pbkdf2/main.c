#include "fastpbkdf2.h"
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

char* uintToHex(uint8_t * in,size_t size){
	char* out = (char *)malloc(sizeof (char) * size*2 + 1);
	char hex[] = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
	for(int i = 0;i<size;i++){
		out[i*2] =  hex[((in[i] - in[i]%16)/16)];
		out[i*2 + 1] = hex[(in[i]%16)];
	}
	out[size*2] = '\0';
	return out;
}

int main(int argc, char* argv[]){
	size_t o = 1024;

	uint8_t* pw = (uint8_t *) argv[1];

	size_t pwn = strlen(argv[1]);
	size_t nsalt = strlen(argv[2]);
	uint8_t* salt = (uint8_t *) argv[2];
	char * p;
	uint32_t i = (uint32_t) atoi(argv[3]);
	uint8_t* out = (uint8_t*)malloc(sizeof (uint8_t)*o);
	fastpbkdf2_hmac_sha256(pw, pwn,salt,nsalt,i,out,o);
	for(int j = 0;j<o;j++){
		out[j] = ((out[j]%52)>25)? (out[j]%26)+97 : (out[j]%26)+65;
	}
	p = uintToHex(out,o);
	free(out);
	printf("%s",p);
	free(p);
	return 0;
}
