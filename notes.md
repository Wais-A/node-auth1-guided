# Authentication Notes

data is protected by something someone knows, something they have or something they are

passwords is the most common way (something they know)

people are trying to get other people's passwords
if they are easy to guess, then they are vulnerable
if they are stored in an insecure store, or a single point of access sstore, they are vulnerable

password hashing is teh answer ... store the hash, not the password.

we are using bcryptjs to generate hashing in a login attempt is used to generate a hash, which is compared to the store hash for the real password
knowing the stored hash doesn't help - if you supply the hash, it's as good as the wrong password

rainbow tables are hascker's answer use alot of computing power to generate hash's for every possible password