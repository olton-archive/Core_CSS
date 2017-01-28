call npm version %3
call git add .
call git commit -am %2
call git push
call git checkout master
call git pull
call git merge %1
call git push
call git push mirror
call git checkout %1