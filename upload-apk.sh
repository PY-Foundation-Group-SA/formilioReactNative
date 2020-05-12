mkdir $HOME/buildApk/
mkdir $HOME/Github/

cp -R android/app/build/outputs/apk/debug/app-debug.apk $HOME/buildApk/

cd $HOME/Github/
git config --global user.email "sarthak.pranesh2018@vitstudent.ac.in" 
git config --global user.name "sarthakpranesh" 
git clone https://sarthakpranesh:$GITHUB_API_KEY@github.com/sarthakpranesh/formilioReactNative.git

cd formilioReactNative
git checkout -b build
rm -rf ./*
cp -Rf $HOME/buildApk/* .
git add .
git remote add origin https://sarthakpranesh:$GITHUB_API_KEY@github.com/sarthakpranesh/formilioReactNative.git
git commit -m "Travis build $TRAVIS_BUILD_NUMBER push" 
git push origin build -f
echo "Done"