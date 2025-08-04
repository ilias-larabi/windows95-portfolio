@echo off
echo Syncing changes to GitHub...

git add .
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"
git push

echo.
echo Changes pushed to GitHub successfully!
pause
