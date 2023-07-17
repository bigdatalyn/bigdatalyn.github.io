
fatal: not in a git directory
Error: Command failed with exit 128: git



```
honglin@honglin-mac nim-1.6.14 % brew -v
Homebrew 3.6.7-34-g4e48a9e
fatal: detected dubious ownership in repository at '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core'
To add an exception for this directory, call:

	git config --global --add safe.directory /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core
Homebrew/homebrew-core (no Git repository)
fatal: detected dubious ownership in repository at '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask'
To add an exception for this directory, call:

	git config --global --add safe.directory /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask
Homebrew/homebrew-cask (no Git repository)
honglin@honglin-mac nim-1.6.14 % git config --global --add safe.directory /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core
honglin@honglin-mac nim-1.6.14 % git config --global --add safe.directory /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask
honglin@honglin-mac nim-1.6.14 % brew -v                                                                                         
Homebrew 3.6.7-34-g4e48a9e
Homebrew/homebrew-core (git revision 89ac56e4c8b; last commit 2022-10-30)
Homebrew/homebrew-cask (git revision 4eb1703fe8; last commit 2022-10-30)
honglin@honglin-mac nim-1.6.14 % brew install nim                                                                                
fatal: not in a git directory
Warning: No remote 'origin' in /usr/local/Homebrew/Library/Taps/homebrew/homebrew-services, skipping update!
```


[HomeBrew : Command failed with exit 128: git 异常处理](https://juejin.cn/post/7122343112604647437)

> rm -rf /opt/homebrew/Library/Taps/homebrew/homebrew-core
> brew tap homebrew/core
> rm -rf /opt/homebrew/Library/Taps/homebrew/homebrew-cask
> brew tap homebrew/cask




