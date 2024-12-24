#!/bin/bash

# Description: A sample shell script to demonstrate basic commands

# Print a message
# Print a message
echo "This is a sample shell script."



# Print the current date and time
echo "Current date and time: $(date)"

# Print the user's home directory
echo "Home directory: $HOME"

# Print the number of files in the current directory
echo "Number of files in the current directory: $(ls | wc -l)"

# Print the contents of a file
echo "Contents of file.txt:"
cat ./src/shellscripts/file.txt 

# Print the sum of two numbers
echo "Sum of 5 and 3: $(expr 5 + 3)"

# Print the difference between two numbers
echo "Welcome to the sample shell script!"

