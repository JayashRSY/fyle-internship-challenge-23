<h1 align="center">Welcome to Github Finder 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="doc.com" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://twitter.com/JayashRSY" target="_blank">
    <img alt="Twitter: JayashRSY" src="https://img.shields.io/twitter/follow/JayashRSY.svg?style=social" />
  </a>
</p>

> Github user finder

### ✨ [Demo](https://githubuserfinder.vercel.app/)

## Install

```sh
npm i
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Jayash**

* Website: [bit.ly/JayashRSY](https://bit.ly/JayashRSY)
* Twitter: [@JayashRSY](https://twitter.com/JayashRSY)
* Github: [@JayashRSY](https://github.com/JayashRSY)
* LinkedIn: [@JayashRSY](https://linkedin.com/in/JayashRSY)

## Show your support

Give a ⭐️ if this project helped you!

***

## About Unit test cases

## API Service

1. The service is first instantiated and HTTP testing is set up in the beforeEach block.
2. The first test checks if the service has been created successfully.
3. The second test ensures that the getUser method fetches user data from the API correctly.
4. The third test checks if the getRepositories method retrieves repository data based on the provided parameters.

## App Component

1. should create the app checks if the component is created successfully.
2. should fetch user data and repositories on getUserDetails tests the getUserDetails method.
3. should show error message when getUserDetails fails tests the error scenario for getUserDetails.
4. should update current page and fetch new repositories on onPageChange tests the onPageChange method.
5. should update items per page and fetch new repositories on onItemsPerPageChange tests the onItemsPerPageChange method.

NOTE: Make sure to adjust the mock data and API endpoints according to your specific use case. When you run your tests using ng test, these unit tests will be executed, and you should see the test results in your console.
