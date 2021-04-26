const csc = window._csc;

console.log("initializing csc sdk", window._csc);

csc("init", {
  debug: true,
  contentId: "1",
  subscriptionUrl: "https://www.google.com",
  signInUrl: "https://www.google.com",
  title: "1",
  clientId: "5fffcf4b2a2d942cb093ea18",
  buttonMode: true,
  wrappingElementId: "paywall",
  successCallback: async (validationObject) => {
    console.log(
      "Success callback received from conscent with a validationObject",
      validationObject
    );

    console.log("Initiating verification with conscent backend");
    const xhttp = new XMLHttpRequest(); // using vanilla javascript to make a post request (works everywhere)
    const url = `${API_URL}/content/consumption/${validationObject.consumptionId}`;
    xhttp.open("POST", url, true);
    // e is the response event
    xhttp.onload = (e) => {
      // @ts-ignore
      const backendConfirmationData = JSON.parse(e.target.response);

      // verifying that the validation received matches the backend data
      if (
        validationObject.consumptionId ===
          backendConfirmationData.consumptionId &&
        validationObject.clientId ===
          backendConfirmationData.payload.clientId &&
        validationObject.contentId === backendConfirmationData.payload.contentId
      ) {
        // Validation successful
        console.log("successful validation");
        // showStory would be your function that will do all the actions that need to be done to show the whole story
        // showStory(true);
      }
    };
    xhttp.send();
  },
  unauthorizedCallback: () => {
    console.log("unauthorized callback called");
  },
});
