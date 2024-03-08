#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    long i, num;
    if (argc < 2)
    {
        return 1;
    }

    num = strtol(argv[1], NULL, 10);
    if (num < 2)
    {
        return 1;
    }
    for (i = 2; i < num; ++i)
    {
        if (num % i == 0)
        {
            return 1;
        }
    }
    return 0;
}