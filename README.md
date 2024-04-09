
>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.


## Example video

<video width="320" height="540" controls>
  <source src="https://raw.githubusercontent.com/aidanarmstrong/Next2Go-Entain-/main/example/video.mp4" type="video/mp4">
  Your browser does not support video players.
</video>

## Step 1: Install dependencies

First, you will need to start with installing all the dependencies

```bash
# using npm
npm install

# OR using Yarn
yarn 
```
## Step 2: Make sure you have installed the modulars (IOS)

Run this command if you are wanting to install on an IOS emulator

```
yarn ios-pod-install // or cd ios && pod install
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 4: Testing the Next2Go App

```
yarn test
```
