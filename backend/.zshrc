
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Applications/ANACONDA/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Applications/ANACONDA/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Applications/ANACONDA/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Applications/ANACONDA/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

export PATH="/opt/homebrew/opt/libpq/bin:$PATH"
export LDFLAGS="-L/opt/homebrew/opt/libpq/lib"
export CPPFLAGS="-I/opt/homebrew/opt/libpq/include"
export DYLD_LIBRARY_PATH="/opt/homebrew/opt/libpq/lib:$DYLD_LIBRARY_PATH"
