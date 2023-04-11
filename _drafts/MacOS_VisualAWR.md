
visual-awr 5.1 -> Portal versioin / Fix problems:


honglin@honglin-mac visual-awr-5.1 % pwd
/Users/honglin/Desktop/visual-awr-5.1
honglin@honglin-mac visual-awr-5.1 % xattr -l /Users/honglin/Desktop/visual-awr-5.1
com.apple.macl: 
com.apple.quarantine: 0081;6411311f;Chrome;90A087AA-DAAC-4A32-A5FD-2A735F8925FA
honglin@honglin-mac visual-awr-5.1 % sudo xattr -r -d com.apple.quarantine /Users/honglin/Desktop/visual-awr-5.1
Password:
honglin@honglin-mac visual-awr-5.1 % xattr -l /Users/honglin/Desktop/visual-awr-5.1                             
com.apple.macl: 
honglin@honglin-mac visual-awr-5.1 % ./visual-awr


