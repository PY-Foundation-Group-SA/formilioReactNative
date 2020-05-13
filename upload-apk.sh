#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  mkdir $HOME/buildApk/
  mkdir $HOME/Github/

  cp -R android/app/build/outputs/apk/debug/app-debug.apk $HOME/buildApk/

  cd $HOME/Github/
  git config --global user.email "sarthak.pranesh2018@vitstudent.ac.in" 
  git config --global user.name "sarthakpranesh" 

  mkdir formilioReactNative
  cd formilioReactNative
  git init
  git remote add origin https://sarthakpranesh:$GITHUB_API_KEY@github.com/sarthakpranesh/formilioReactNative.git
  git checkout -b build
  cp -Rf $HOME/buildApk/* .
  git add .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER push" 
  git push origin build -f
  echo "Done"
fi